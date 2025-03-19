import express from "express";
import { getCart, addCourseToCart, removeFromCart } from "../../controllers/cartController.js";
import { authUser } from "../../middlewares/authUser.js";

const router = express.Router();

router.get("/get-cart-items",authUser, getCart);
router.post("/add-to-cart", authUser, addCourseToCart);
router.post("/remove-cart-item", authUser, removeFromCart);

export default router;
