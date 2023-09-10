import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import courseRouter from "./routes/course"
import purchaseRouter from "./routes/purchase"
import cartRouter from "./routes/cart"
const app = express();



app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/user/courses",courseRouter)
app.use("/user/courses/purchased",purchaseRouter)
app.use("/user/courses/cart",cartRouter)
const port:number=3001




mongoose.connect('mongodb://127.0.0.1:27017/courses',{dbName: "courses" });



app.listen(port,()=>{console.log(`server running on port ${port}`)})