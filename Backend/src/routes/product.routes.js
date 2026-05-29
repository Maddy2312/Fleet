import { Router } from "express";
import authenticateSeller from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
const productRouter = Router();
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    }
});

productRouter.post("/", authenticateSeller, upload.single("images", 7), createProduct);
export default productRouter;