import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { AppDataSource } from "@shared/database/dataSource";

export class CategoryRepository extends Repository<Category> {
  constructor() {
    super(Category, AppDataSource.manager);
  }
}
