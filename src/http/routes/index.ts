import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import productsRoutes from "./productsRoutes";

export const AppRouter = Router();

AppRouter.use("/users", userRoutes);

AppRouter.use("/products", productsRoutes);

export const PublicRouter = Router();

PublicRouter.use("/auth", authRoutes);
