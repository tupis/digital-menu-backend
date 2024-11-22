import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { AppRouter, PublicRouter } from "@http/routes";
import { AppDataSource } from "@shared/database/dataSource";
import { Logger } from "@shared/logger";
import { authMiddleware } from "@shared/middleware/auth";

import { Server } from "socket.io";
import http from "node:http";
import { executeSeed } from "@shared/database/seed";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(PublicRouter);
app.use(authMiddleware);
app.use("/api", AppRouter);
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  Logger.info("Novo cliente conectado");
  socket.on("disconnect", () => {
    Logger.info("Cliente desconectado");
  });
});
AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, async () => {
      Logger.info("Banco de dados conectado");
      Logger.info("Executando seed");
      await executeSeed(AppDataSource);
      Logger.info("Servidor rodando na porta " + PORT);
    });
  })
  .catch((error) => {
    Logger.error("Erro ao conectar ao banco de dados", error);
  });
