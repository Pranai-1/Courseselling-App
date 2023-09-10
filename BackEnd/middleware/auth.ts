import { NextFunction,Response,Request } from "express"


import jwt from 'jsonwebtoken';

export const userSecretKey: string = "user";

  
export const AuthenticateJWTforUser=(req:Request,res:Response,next:NextFunction)=>{
  let authHeader: string | undefined = req.headers.authorization;
 
    if(authHeader){
      const token: string = authHeader.split(' ')[1];
    jwt.verify(token,userSecretKey,(err,user)=>{
      if(err){
        return res.status(403).json({message:"Invalid"})
      }
      if(!user){
        return res.status(403).json({message:"Invalid"})
      }
      if(typeof user=="string"){
        return res.status(403).json({message:"Invalid"})
      }

        req.headers["userId"]=user.id
        next()
      
    })
  }else{
    return res.status(401).json({message:"Invalid"})
  }
  }

 