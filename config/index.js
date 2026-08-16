import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const DBconnection  = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connection succefuly connected")
    } catch (error) {
        console.log("connection is feils please try again",error)
        process.exit(1)
    }
}
export default DBconnection