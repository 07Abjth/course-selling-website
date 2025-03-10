import express from "express";
import cartRoutes from "./cartRoutes.js";
import courseRoutes from "./courseRoutes.js";
import orderRoutes from "./orderRoutes.js";
import reviewRoutes from "./reviewRoutes.js";

const router = express.Router();

router.use("/cart", cartRoutes);
router.use("/courses", courseRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);

export default router;
