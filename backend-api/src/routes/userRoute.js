import express from "express";
import {
  loginUser,
  registerUser,
  getUserData,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", registerUser);

// Protected route
router.get("/me", authMiddleware, getUserData);

export default router;
