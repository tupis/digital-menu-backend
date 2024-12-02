import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { AppDataSource } from "@shared/database/dataSource";
import { Product } from "@modules/products/entities/Product";

export class CategoryRepository extends Repository<Category> {
  constructor() {
    super(Category, AppDataSource.manager);
  }

  async associateProducts(category: Category, products: Product[]) {
    category.products = [...category.products, ...products];
    const associated = this.create(category);
    return await this.save(associated);
  }
}
