import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { UserMiddleware } from "./middleware/UserMiddleware";

const router = Router();

const categoryController = new CategoryController();
const postController = new PostController();
const userController = new UserController();

const userMiddleware = new UserMiddleware();

// Category
router.post("/category", userMiddleware.middleware, categoryController.create);
router.get("/categorys", categoryController.showAll);
router.put("/category", userMiddleware.middleware, categoryController.update);
router.delete("/category/:id", userMiddleware.middleware, categoryController.delete);

// Post
router.post("/post", userMiddleware.middleware, postController.create);
router.get("/posts", postController.showAll);
router.put("/post", userMiddleware.middleware, postController.update);
router.delete("/post/:id", userMiddleware.middleware, postController.delete);

// User
router.post("/signup", userController.signUp);
router.post("/login", userController.login);

export { router }