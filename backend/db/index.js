import mongoose from "mongoose";
import DB_NAME from "../constants.js"


const connectDB = async () => {
    try {
        const connInst = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    } 
    catch (error) {
        console.log(error)
    }
}


export default connectDB