import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";

const router = Router();

const categoryController = new CategoryController();

// Category
router.post("/category", categoryController.create);
router.get("/category", categoryController.show);
router.put("/category", categoryController.update);
router.delete("/category/:id", categoryController.delete);

// Post

export { router }