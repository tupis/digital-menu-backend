import { Router } from "express";
import { ProductsController } from "@http/controllers/ProductsController";
import { validationMiddlewareDto } from "@shared/middleware/validation.dto";
import { CreateProductDto } from "@modules/products/dto/create-product.dto";
import { UpdateProductDto } from "@modules/products/dto/update-product.dto";

const productsController = new ProductsController();
const router = Router();

router.post("/", validationMiddlewareDto(CreateProductDto), (req, res) => {
  productsController.create(req, res);
});

router.patch("/:id", validationMiddlewareDto(UpdateProductDto), (req, res) => {
  productsController.update(req, res);
});

router.delete("/:id", (req, res) => {
  productsController.delete(req, res);
});

router.get("/", (req, res) => {
  productsController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  productsController.getOne(req, res);
});

export default router;
