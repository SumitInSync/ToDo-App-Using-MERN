import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from 'dotenv';

dotenv.config(); // Ensure the .env file is loaded

const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MongoDB connected !! DB HOST :  ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB Connection Error" , error)
        process.exit(1);
    }
}
export default connectDB