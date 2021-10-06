import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { PostController } from "./controllers/PostController";

const router = Router();

const categoryController = new CategoryController();
const postController = new PostController();

// Category
router.post("/category", categoryController.create);
router.get("/category", categoryController.show);
router.put("/category", categoryController.update);
router.delete("/category/:id", categoryController.delete);

// Post
router.post("/post", postController.create);
router.get("/post", postController.show);
router.put("/post", postController.update);

export { router }