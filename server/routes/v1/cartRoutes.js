import express from "express";
import { getCart, addCourseToCart, removeCourseFromCart } from "../../controllers/cartController.js";
import { authUser } from "../../middlewares/authUser.js";

const router = express.Router();


router.get("/get-cart-items", getCart);
router.post("/add-to-cart", authUser, addCourseToCart);
router.post("/remove-cart-item", removeCourseFromCart);

export default router;
