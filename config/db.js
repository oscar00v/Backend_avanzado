import mongoose from "mongoose";
import dotenv from "dotenv";
import { mongoDomain, mongoUser, mongoPWD, mongoDb } from "./constant.js";
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;