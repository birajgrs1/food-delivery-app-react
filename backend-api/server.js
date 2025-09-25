import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import fs from "fs";
import path from "path";

import { connectDB } from "./src/config/connectDB.js";
import foodRoute from "./src/routes/foodRoute.js";
import userRoute from "./src/routes/userRoute.js";
import cartRoute from "./src/routes/cartRoute.js";
import orderRoute from "./src/routes/orderRoute.js";

// Swagger docs
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("swagger-output.json"), "utf-8")
);

const app = express();

// CORS 
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  process.env.ADMIN_FRONTEND_URL || "http://localhost:5174",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(
  corsOptions
));

app.use(express.json());

// Serve uploads as static files
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Swagger auto-generated docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Root API
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

// Routes
app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📖 Swagger UI available at http://localhost:${PORT}/api-docs`);
});


