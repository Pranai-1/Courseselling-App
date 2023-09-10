import express from "express";
import { AuthenticateJWTforUser } from "../middleware/auth";
const router = express.Router();
import { user,course } from "./interface";
import {Course,User } from "../db"


router.post("/:id", AuthenticateJWTforUser, async (req, res) => {
    const courseId = req.params.id;
    const isCourse: course | null = await Course.findById(courseId);
  
    if (isCourse) {
      const userCheck: user | null = await User.findById(req.headers["userId"]);
     
      if (userCheck) {
       
        const indexOfCourse = userCheck.cart.findIndex(course => course._id==courseId);
    
        if (indexOfCourse == -1) {
           try {
            const updatedUser = await User.findByIdAndUpdate(
              req.headers["userId"],
              { $push: { cart: isCourse } },
              { new: true }
            );
         
            if (updatedUser) {
              res.json({ message: "success", user: updatedUser });
            } else {
              res.status(404).json({ message: "User not found" });
            }
          } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
          }
        
        
        } else {
          res.status(400).json({ message: "present" });
        }
      }
      
    else {
      res.status(404).json({ message: "User not found" });
    }
        }
        else {
          res.status(404).json({ message: "Course not found" });
        }
      
  });
  
 
  


  router.get("/", AuthenticateJWTforUser, async (req, res) => {
    try {
      const userCheck: user | null = await User.findById(req.headers["userId"]);
      
      if (!userCheck) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const coursesId = userCheck.cart;
      
      if (coursesId.length > 0) {
        const courses = await Promise.all(
          coursesId.map(async (course) => {
            const cartItems: course | null = await Course.findById(course._id);
            return cartItems;
          })
        );
  
        return res.status(200).json({ courses: courses});
      } else {
        return res.status(200).json({ courses: [] });
      }
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  export default router