import { CategoryRepository } from "./repositories/CategoryRepository";
import { CategoryService } from "./services/CategoryService";

export function getCategoryService(): CategoryService {
  const categoryRepository = new CategoryRepository();
  return new CategoryService(categoryRepository);
}
