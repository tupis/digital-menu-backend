import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@modules/user/entities/User";
import { Product } from "@modules/products/entities/Product";
import { ProductOptional } from "@modules/products/entities/ProductOptional";
import { Role } from "@modules/user/entities/Role";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product, ProductOptional, Role],
});
