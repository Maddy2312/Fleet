import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";

const authenticateSeller = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(
            token,
            config.JWT_SECRET
        );

        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if(user.role !== "seller"){
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        req.user = user;
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }

};

export default authenticateSeller;