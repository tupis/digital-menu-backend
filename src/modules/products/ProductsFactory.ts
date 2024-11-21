import { ProductsRepository } from "./repositories/ProductsRepository";
import { ProductsService } from "./services/ProductsService";

export function getProductsService(): ProductsService {
  const productsRepository = new ProductsRepository();
  return new ProductsService(productsRepository);
}
