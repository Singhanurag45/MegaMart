// backend/routes/OrderRoutes.js

import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 POST /api/orders - Create a new order (User)
router.post("/", protect, async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ error: "No order items" });
    return;
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// 🔹 GET /api/orders/myorders - Get logged-in user's orders (User)
router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// ------------------- ADMIN ROUTES -------------------

// 🔹 GET /api/orders - Get all orders (Admin)
router.get("/", protect, admin, async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

// 🔹 PUT /api/orders/:id/status - Update order status (Admin)
router.put("/:id/status", protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status;
    if (req.body.status === "delivered") {
      order.deliveredAt = Date.now();
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

export default router;
