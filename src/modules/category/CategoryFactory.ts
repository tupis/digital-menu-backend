import { PointOfSalesRepository } from "@modules/pointOfSales/repositories/PointOfSalesRepository";
import { CategoryRepository } from "./repositories/CategoryRepository";
import { CategoryService } from "./services/CategoryService";
import { ProductsRepository } from "@modules/products/repositories/ProductsRepository";

export function getCategoryService(): CategoryService {
  const categoryRepository = new CategoryRepository();
  const productRepository = new ProductsRepository();
  const pointOfSalesRepository = new PointOfSalesRepository();
  return new CategoryService(
    categoryRepository,
    productRepository,
    pointOfSalesRepository,
  );
}
