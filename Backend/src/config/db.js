import mongoose from "mongoose";
import { config } from "./config.js";


async function connectDB() {
    try {
        const conn = await mongoose.connect(config.mongoURI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;