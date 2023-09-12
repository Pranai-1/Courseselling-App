

import axios from "axios";
import { useEffect, useState } from "react";

import CourseCard from "./CourseCard";

interface Course {
    _id: string;
    title: string;
    description: string;
    image: string;
    published: boolean,
    adminId: string,
    name:string,
  }

function Cart(){

    let token=localStorage.getItem("token")
    const[cartCourses,setCartCourses]=useState<Course[]>([])
    useEffect(()=>{
    async function getCartCourses(){
        const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
     try{
        const response=await axios.get("http://localhost:3001/user/courses/cart",config)
        setCartCourses(response.data.courses)
     }catch{
        setCartCourses([]) 
     }
    
    }
    getCartCourses()
    },[])

    
      


  return(
    <>
     {cartCourses.length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center ">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">Cart is Empty</p>
           </div>
          </>
        ):(
        
      <div className=" w-screen bg-blue-100 ">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen flex justify-center">Cart Items</p>
        <div className=" p-3 flex flex-wrap justify-center">
         
             {cartCourses.map((course) => (
              <CourseCard
                id={course._id}
                image={course.image}
                title={course.title}
                description={course.description}
                name={course.name}
                show="cart" // You were missing a closing double quote here
              />
            ))}
       
        </div>
      </div>
)}
    </>
  )


}
export default Cart