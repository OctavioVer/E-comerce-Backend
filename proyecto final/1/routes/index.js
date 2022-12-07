import { Router } from "express";
import prodRouter from "./products.js";
import cartRouter from "./cart.js";

const router = Router();

router.use("/products", prodRouter);
router.use("/cart", cartRouter);

export default router;
