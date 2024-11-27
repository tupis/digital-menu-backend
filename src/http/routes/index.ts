import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import productsRoutes from "./productsRoutes";
import pointOfSalesRoutes from "./pointOfSalesRoutes";
import categoryRoutes from "./categoryRoutes";

export const AppRouter = Router();

AppRouter.use("/users", userRoutes);

AppRouter.use("/products", productsRoutes);

AppRouter.use("/pointofsales", pointOfSalesRoutes);

AppRouter.use("/category", categoryRoutes);

export const PublicRouter = Router();

PublicRouter.use("/auth", authRoutes);
