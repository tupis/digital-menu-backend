import { Repository } from "typeorm";
import { ProductOptional } from "@modules/products/entities/ProductOptional";
import { AppDataSource } from "@shared/database/dataSource";
import { whereId } from "@utils/where-id";
import { CreateOptionalDto } from "../dto/create-optional.dto";

export class ProductOptionalRepository extends Repository<ProductOptional> {
  constructor() {
    super(ProductOptional, AppDataSource.manager);
  }

  async deleteByIdProduct(id: Id) {
    return await this.softDelete({ product: whereId(id) });
  }

  async createAndSave(data: CreateOptionalDto) {
    const newOptional = this.create(data);
    return await this.save(newOptional);
  }
}
