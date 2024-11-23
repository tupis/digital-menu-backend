import { Repository } from "typeorm";
import { PointOfSales } from "../entities/PointOfSales";
import { AppDataSource } from "@shared/database/dataSource";

export class PointOfSalesRepository extends Repository<PointOfSales> {
  constructor() {
    super(PointOfSales, AppDataSource.manager);
  }
}
