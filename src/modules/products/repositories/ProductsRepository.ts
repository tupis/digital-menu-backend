import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { AppDataSource } from "@shared/database/dataSource";

export class ProductsRepository extends Repository<Product> {
  constructor() {
    super(Product, AppDataSource.manager);
  }
}
