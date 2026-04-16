import { Router } from "express";
import { googleCallback, Login, Register } from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", registerValidator, Register);
authRouter.post("/login", loginValidator, Login);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback,
);

export default authRouter;
