import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";

const router = Router();

const categoryController = new CategoryController();
const postController = new PostController();
const userController = new UserController();

// Category
router.post("/category", categoryController.create);
router.get("/category", categoryController.showAll);
router.put("/category", categoryController.update);
router.delete("/category/:id", categoryController.delete);

// Post
router.post("/post", postController.create);
router.get("/post", postController.showAll);
router.put("/post", postController.update);
router.delete("/post/:id", postController.delete);

// User
router.post("/signup", userController.signUp);
router.post("/login", userController.login);

export { router }