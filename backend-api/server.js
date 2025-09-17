import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/connectDB.js";


const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify OpenAPI version
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // Fixed the issue here by using PORT
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API route files containing JSDoc comments
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at a specific route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Basic route for demonstration
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});


