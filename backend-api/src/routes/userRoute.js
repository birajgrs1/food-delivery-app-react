import express from "express";
import {
  loginUser,
  registerUser,
  getUserData,
  logout,
  refreshToken,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

// Protected routes
router.get("/me", authMiddleware, getUserData);

export default router;
