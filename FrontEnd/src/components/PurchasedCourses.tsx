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

function PurchasedCourses(){
    let token=localStorage.getItem("token")
    const[purchasedCourses,setPurchasedCourses]=useState<Course[]>([])
    useEffect(()=>{
    async function getPurchasedCourses(){
        const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
     try{
        const response=await axios.get("http://localhost:3001/user/courses/purchased",config)
        setPurchasedCourses(response.data.courses)
     }catch{
        setPurchasedCourses([]) 
     }
    
    }
    getPurchasedCourses()
    },[])

  return(
    <>
     {purchasedCourses.length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center ">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">You haven't purchased courses</p>
           </div>
          </>
        ):(
        
      <div className="w-screen  bg-blue-100  pb-0 mb-0">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen flex justify-center">Purchased Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {purchasedCourses.map((course) => (
            <CourseCard
            id={course._id}
            image={course.image}
            title={course.title}
            description={course.description}
            name={course.name}
            show="purchased"
          />
            
          ))}
        </div>
       
      </div>
)}
    </>
  )


}
export default PurchasedCourses