import mongoose from "mongoose";
import { config } from "./config.js";

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("connecting to database");
  } catch (error) {
    throw new Error("MONGO_URI is not defined in environment");
  }
};
