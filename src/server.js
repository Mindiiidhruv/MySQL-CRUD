import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { createUserTable } from "./models/Users.js";
import { createProductTable } from "./models/Products.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Create table if not exists
createUserTable();
createProductTable();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
