import express from "express";
import { createOrder, getUserOrders, getOrderById } from "../../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:userId", getUserOrders);
router.get("/details/:id", getOrderById);

export default router;
