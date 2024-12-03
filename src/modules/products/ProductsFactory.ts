import { ProductOptionalRepository } from "./repositories/ProductOptionalRepository";
import { ProductsRepository } from "./repositories/ProductsRepository";
import { ProductsService } from "./services/ProductsService";

export function getProductsService(): ProductsService {
  const productsRepository = new ProductsRepository();
  const productOptionalRepository = new ProductOptionalRepository();
  return new ProductsService(productsRepository, productOptionalRepository);
}
