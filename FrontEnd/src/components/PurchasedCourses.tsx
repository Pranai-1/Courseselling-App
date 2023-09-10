import axios from "axios";
import { useEffect, useState } from "react";


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
        
      <div className="h-screen w-screen bg-slate-100 p-10">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen mt-3 flex justify-center">Purchased Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {purchasedCourses.map((course) => (
            <div key={course._id}  className="bg-indigo-100 m-10 h-[350px] w-[300px] rounded-lg overflow-hidden shadow-md ">
              <img className="h-[160px] w-full object-cover" src={course.image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0">
                <h2 className="font-bold w-full text-xl text-blue-700">{course.title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[20px] overflow-auto m-2 ml-1">{course.description}</p>
                <p className="font-medium text-m text-indigo-600 w-full h-[25px] overflow-auto">Author : {course.name}</p>
                <button className="bg-green-800 text-white text-sm p-2 m-4 ml-[70px] rounded hover:bg-indigo-800 focus:outline-none">
               Watch Content
              </button>
              
                </div>
               
            </div>
          ))}
        </div>
      </div>
)}
    </>
  )


}
export default PurchasedCourses