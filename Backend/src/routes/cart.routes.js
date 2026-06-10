import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart, validateUpdateQuantity } from "../validators/cart.validator.js";
import { addToCart, createOrderController, getCart, updateQuantity } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)
cartRouter.get("/", authenticateUser, getCart);
cartRouter.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateUpdateQuantity, updateQuantity);
cartRouter.post("/payment/create/order", authenticateUser, createOrderController)
export default cartRouter;