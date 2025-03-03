import mongoose from "mongoose";
import "dotenv/config";

const mongoConnect = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/shopZap`);
        console.log("database connected successfully");
        
    } catch (error) {
        console.log("error : ",error);
    }
}

export default mongoConnect;