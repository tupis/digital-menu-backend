import { Router } from "express";
import userRoutes from "./userRoutes";

export const AppRouter = Router();

AppRouter.use("/users", userRoutes);
