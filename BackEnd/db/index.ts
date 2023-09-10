import mongoose, { Document, Model, Schema } from "mongoose";
import { user,course } from "../routes/interface";


  const userSchema:Schema<user & Document>=new mongoose.Schema({
    email: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  })

  const courseSchema:Schema<course & Document>=new mongoose.Schema({
    title: String,
      description: String,
      price: Number,
      image: String,
      published: Boolean,
      adminId: String,
      name:String,
     
  })
  export const User:Model<user & Document>= mongoose.model('User',userSchema)
  export const Course= mongoose.model<course & Document>('Course',courseSchema)