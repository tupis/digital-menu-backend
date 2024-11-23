import { Router } from "express";
import { PointOfSalesController } from "@http/controllers/PointOfSalesController";
import { validationMiddlewareDto } from "@shared/middleware/validation.dto";
import { CreatePointOfSalesDto } from "@modules/pointOfSales/dto/create-point-of-sales.dto";
import { UpdatePointOfSalesDto } from "@modules/pointOfSales/dto/update-point-of-sales.dto";

const pointofsalesController = new PointOfSalesController();
const router = Router();

router.post("/", validationMiddlewareDto(CreatePointOfSalesDto), (req, res) => {
  pointofsalesController.create(req, res);
});

router.get("/", (req, res) => {
  pointofsalesController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  pointofsalesController.getById(req, res);
});

router.delete("/:id", (req, res) => {
  pointofsalesController.delete(req, res);
});

router.patch(
  "/:id",
  validationMiddlewareDto(UpdatePointOfSalesDto),
  (req, res) => {
    pointofsalesController.update(req, res);
  },
);

export default router;
