import express from "express";
import { placeOrder, verifyOrder, userOrder, listOrders, updateOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/update", updateOrderStatus);


export default orderRouter;