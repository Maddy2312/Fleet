import { Router } from "express";
import { googleCallback, loginUser, registerUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import passport from "passport";
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
        failureRedirect: "/login",
        session:false
    }), googleCallback
);

export default authRouter;