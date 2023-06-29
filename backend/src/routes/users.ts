import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.post("/", requiresAuth, UserController.getAuthenticatedUser);

router.get("/signup", UserController.getAuthenticatedUser);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;