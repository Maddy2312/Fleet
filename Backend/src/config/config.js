import dotenv from "dotenv";
dotenv.config();

if(!process.env.PORT){
    throw new Error("PORT is not defined");
}

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}
if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined");
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined");
}
if(!process.env.GOOGLE_CALLBACK_URI){
    throw new Error("GOOGLE_CALLBACK_URI is not defined");
}
if(!process.env.NODE_ENV){
    throw new Error("NODE_ENV is not defined");
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined");
}

if(!process.env.Razorpay_API_KEY){
    throw new Error("Razorpay_API_KEY is not defined");
}
if(!process.env.Razorpay_KEY_SECRET){
    throw new Error("Razorpay_KEY_SECRET is not defined");
}

export const config = {
    port : process.env.PORT,
    mongoURI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URI : process.env.GOOGLE_CALLBACK_URI,
    NODE_ENV : process.env.NODE_ENV,
    IMAGEKIT_PRIVATE_KEY : process.env.IMAGEKIT_PRIVATE_KEY,
    Razorpay_API_KEY : process.env.Razorpay_API_KEY,
    Razorpay_KEY_SECRET : process.env.Razorpay_KEY_SECRET,
}