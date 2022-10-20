import { Router } from "express";
import UserController from "./controllers/UserController";

const router = Router();

router.post("/users", UserController.newUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUser);
router.patch("/users/:id", UserController.patchUser);
router.delete("/users/:id", UserController.deleteUser);

export {router}