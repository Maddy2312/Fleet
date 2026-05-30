import { Router } from "express";
import authenticateSeller from "../middlewares/auth.middleware.js";
import { createProduct, getSellerProducts } from "../controllers/product.controller.js";
const productRouter = Router();
import multer from "multer";
import { createProductValidator } from "../validators/product.validator.js";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    }
});

productRouter.post("/create", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct);
productRouter.get("/seller", authenticateSeller, getSellerProducts);
export default productRouter;