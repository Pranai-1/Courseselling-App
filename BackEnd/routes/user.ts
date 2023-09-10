import mongoose, { Model } from "mongoose";
import express, { Router } from "express";
import { User } from "../db"; // Assuming these are separate modules
import jwt from 'jsonwebtoken';
import { AuthenticateJWTforUser, userSecretKey } from "../middleware/auth";
import { user,course } from "./interface";
import {z} from "zod"




const router:Router=express.Router()

const userInput=z.object({
  email:z.string().min(10).max(40).email(),
  password:z.string().min(5).max(40)
})
   
   router.post("/signup",async (req, res) => {
    const parsedInput=userInput.safeParse(req.body)
    if(!parsedInput.success){
      return res.status(404).json({message:parsedInput.error.message})
    }
       const email=parsedInput.data.email
       const password=parsedInput.data.password
       const user:user | null=await User.findOne({ email })
       if(user){
         res.status(403).json({ message: 'User already exists' });
       }else{
       
        const newUser = new User({ email, password });
         newUser.save();
         let userToken=jwt.sign({id:newUser._id},userSecretKey,{expiresIn:'1h'})
         return  res.status(201).json({message:"success",token:userToken})
       }
        })
   
 router.post("/login",async(req,res)=>{
  const parsedInput=userInput.safeParse(req.body)
  if(!parsedInput.success){
    return res.status(404).json({message:parsedInput.error.message})
  }
     const email=parsedInput.data.email
     const password=parsedInput.data.password
       
       const user:user | null=await User.findOne({ email,password })
       if(user){
         let userToken=jwt.sign({id:user._id},userSecretKey,{expiresIn:'1h'})
         res.status(200).json({message:"success",token:userToken,email:email})
       }else{
         res.status(404).json({message:"failed"})
     }
        })
   

        router.get("/me", AuthenticateJWTforUser, async (req, res) => {
          const userId: string = req.headers["userId"] as string;
          const user: user | null = await User.findOne({ _id: userId });
        
          if (!user) {
            res.status(403).json({ msg: "User doesn't exist" });
            return;
          }
        
          res.json({
            message: "success",
            email: user.email,
          });
        });
        
   
       
   export default router