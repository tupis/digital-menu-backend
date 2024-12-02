import { Router } from "express";
import { CategoryController } from "@http/controllers/CategoryController";
import { validationMiddlewareDto } from "@shared/middleware/validation.dto";
import { AssociateProductsDto } from "@modules/category/dto/associate-products.dto";

const categoryController = new CategoryController();
const router = Router();

router.get("/", (req, res) => {
  categoryController.getAll(req, res);
});

router.post("/", (req, res) => {
  categoryController.create(req, res);
});

router.get("/:id", (req, res) => {
  categoryController.getOne(req, res);
});

router.delete("/:id", (req, res) => {
  categoryController.delete(req, res);
});

router.patch("/:id", (req, res) => {
  categoryController.update(req, res);
});

router.post(
  "/:id/products",
  validationMiddlewareDto(AssociateProductsDto),
  (req, res) => {
    categoryController.associateProducts(req, res);
  },
);

export default router;
