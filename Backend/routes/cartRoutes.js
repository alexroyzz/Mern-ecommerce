import express from "express";

import {
  addToCart,
  getCartItems,
  removeItem,
  updateItem,
} from "../controller/cartControl.js";
const router = express.Router();
router.post("/add", addToCart);

router.get("/:userId", getCartItems);

router.put("/update", updateItem);

router.delete("/remove", removeItem);

export default router;
