import express from "express";
import {
  createProduct,
  getProductsWithUser,
  getProductsByUser,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProductsWithUser);
router.get("/:userId", getProductsByUser);
router.delete("/:productId", deleteProduct);
router.patch("/:productId", updateProduct);
export default router;
