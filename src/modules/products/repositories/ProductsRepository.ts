import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { AppDataSource } from "@shared/database/dataSource";
import { whereId } from "@utils/where-id";

export class ProductsRepository extends Repository<Product> {
  constructor() {
    super(Product, AppDataSource.manager);
  }

  async findManyProductsById(ids: Id[]) {
    const whereConditions = ids.map((id) => {
      return whereId(id);
    });

    return await this.find({
      where: whereConditions,
    });
  }
}
