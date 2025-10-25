import mongoose from "mongoose";
import dotenv from "dotenv";

const connectdb = async () => { 
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully");
    }catch(error){
        console.error("Mongodb connection failed:", error.message);
        process.exit(1);
    }
}

export default connectdb;