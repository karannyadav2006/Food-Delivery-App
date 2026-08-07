import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const db = async (req, res) => {
    try {
       await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected");
       }
    
    catch (err) {

    }
}