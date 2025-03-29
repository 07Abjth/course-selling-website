import express from "express";
import cartRoutes from "./cartRoutes.js";
import courseRoutes from "./courseRoutes.js";
import orderRoutes from "./orderRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import userRoutes from "./userRoutes.js";
import mentorRoutes from "./mentorRoutes.js"


const router = express.Router();

router.use("/user", userRoutes);
router.use("/cart", cartRoutes);
router.use("/courses", courseRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/mentor", mentorRoutes);


export default router;
