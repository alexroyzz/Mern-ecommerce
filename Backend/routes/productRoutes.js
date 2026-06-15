import express from "express";

import {
  createProduct,
  getProducts,
  updatedProduct,
  deleteProduct,
} from "../controller/productControl.js";

import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/add", verifyToken, isAdmin, createProduct);

router.put("/update/:id", verifyToken, isAdmin, updatedProduct);

router.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

export default router;
