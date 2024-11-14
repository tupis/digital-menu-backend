import { Router } from "express";
import { UserController } from "@http/controllers/UserController";

const userController = new UserController();
const router = Router();

router.post("/register", (req, res) => {
  userController.create(req, res);
});
router.post("/login", (req, res) => {
  userController.login(req, res);
});
router.get("/", (req, res) => {
  userController.getAll(req, res);
});

export default router;
