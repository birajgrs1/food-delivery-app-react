import dotenv from "dotenv";
dotenv.config();

import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing...");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Set frontend URL 
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// ========================== PLACE USER ORDER ==========================
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // Create new order in DB
    const newOrder = new OrderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear user cart after placing order
    await UserModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // Prepare line items for Stripe checkout
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/success?orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/cancel?orderId=${newOrder._id}`,
    });

    res.status(200).json({
      success: true,
      url: session.url,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========================== VERIFY ORDER PAYMENT ==========================
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === true) {
      await OrderModel.findByIdAndUpdate(orderId, { $set: { payment: true } });
      return res.status(200).json({ success: true, message: "Payment successful!" });
    } else {
      await OrderModel.findByIdAndUpdate(orderId, { $set: { payment: false } });
      return res.status(200).json({ success: false, message: "Payment failed!" });
    }
  } catch (error) {
    console.error("Verify order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========================== GET USER ORDERS ==========================
export const userOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("User order error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ========================== LISTING ORDERS FOR ADMIN ==========================
export const listOrders = async (req, res) => {
  try{
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  }catch(error){
    console.error("List orders error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// ========================== UPDATE ORDER STATUS ==========================
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { $set: { status } });
    res.status(200).json({ success: true, message: "Order status updated!" });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};