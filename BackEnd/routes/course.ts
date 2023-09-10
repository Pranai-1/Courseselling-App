import express from "express";
import {Course,User } from "../db"; 
const router = express.Router();





 router.get("/",async (req,res)=>{
  const data = await Course.find({ published: true });

    if(data){
     return res.json({ courses:data,message:"success" });
    }else {
      res.status(404).json({ message: 'Course not found' });
    }
    })

 


    

   
  export default router
   
   