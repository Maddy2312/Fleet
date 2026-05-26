import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function generateToken(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token);
  return res.status(200).json({
    success: true,
    message,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, isSeller } = req.body;

    // check existing user
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // create user
    const user = await userModel.create({
      name,
      email,
      password,
      contact,
      role: isSeller ? "seller" : "buyer",
    });

    // store in cookie
    await generateToken(user, res, "User registered successfully");

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
