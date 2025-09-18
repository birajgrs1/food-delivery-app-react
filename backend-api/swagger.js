// swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My Express API",
    description: "A simple Express API with Swagger documentation",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"]; 

swaggerAutogen()(outputFile, endpointsFiles, doc);
