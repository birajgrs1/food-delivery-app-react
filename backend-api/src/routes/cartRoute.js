import express from "express";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.get("/get", authMiddleware, getCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);

export default cartRouter;
