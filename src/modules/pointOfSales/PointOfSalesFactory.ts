import { PointOfSalesRepository } from "./repositories/PointOfSalesRepository";
import { PointOfSalesService } from "./services/PointOfSalesService";

export function getPointOfSalesService(): PointOfSalesService {
  const pointofsalesRepository = new PointOfSalesRepository();
  return new PointOfSalesService(pointofsalesRepository);
}
