import { Router } from "express";
import { Register } from "../controllers/auth.controller.js";
import { registerValidator } from "../validator/auth.validator.js";

const authRouter = Router();


authRouter.post("/register", registerValidator, Register);

export default authRouter;