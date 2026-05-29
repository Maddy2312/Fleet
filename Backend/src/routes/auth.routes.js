import { Router } from "express";
import { googleCallback, loginUser, registerUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import passport from "passport";
import { config } from "../config/config.js";
const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);
authRouter.post("/login", loginValidator, loginUser);
authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login",
        session:false
    }), googleCallback
);

export default authRouter;