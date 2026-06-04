import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)
cartRouter.post("/", authenticateUser, getCart);

export default cartRouter;