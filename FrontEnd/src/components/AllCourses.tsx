import { useEffect, useState } from "react";

import axios from "axios";
import { UserEmail } from "../store/selectors/userDetails";
import { useRecoilValue } from "recoil";


interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  published: boolean,
  adminId: string,
  name:string,
}





function AllCourses() {
    let token = localStorage.getItem('token');
  
    const userEmail=useRecoilValue(UserEmail)
 console.log(userEmail)
  const [courses, setCourses] = useState<Course[]>([]);
 
  useEffect(() => {
     
        axios.get("http://localhost:3001/user/courses").then((res) => {
      
    
          setCourses(res.data.courses)
            
          });
 
   }, []);
 

   async function Buynow(id:string){
    if(userEmail){
    const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };
   try{
  await axios.post(`http://localhost:3001/user/courses/purchased/${id}`,null,config)
  alert("Course purchased Successfully")
   }catch{
    alert("failed to purchase course")
   }
    
}else{
        alert("login to continue")
       }
   }
  


   async function Addtocart(id:string){
   
    if(userEmail){
    const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };
    try{
    await axios.post(`http://localhost:3001/user/courses/cart/${id}`,null,config)
      alert("Course Added To Cart Successfully")
     
    }catch{
      alert("failed to add course")
    }
   }else{
    alert("login to continue")
   }
       
   }
     

  return (
    <>
     {courses.length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center ">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">Courses are not available</p>
           </div>
          </>
        ):(
        
      <div className="h-full w-full bg-slate-100 p-10">
        <p className="text-xl text-blue-600 font-bold p-3 w-screen mt-3 flex justify-center">All Courses</p>
        <div className=" p-3 flex flex-wrap justify-center">
          {courses.map((course) => (
            <div key={course._id}  className="bg-indigo-100 m-10 h-[350px] w-[300px] rounded-lg overflow-hidden shadow-md ">
              <img className="h-[160px] w-full object-cover" src={course.image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0">
                <h2 className="font-bold w-full text-xl text-blue-700">{course.title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[20px] overflow-auto m-2 ml-1">{course.description}</p>
                <p className="font-medium text-m text-indigo-600 w-full h-[25px] overflow-auto">Author : {course.name}</p>
                </div>
                <div className="flex justify-between">
               <button className="h-max w-max bg-indigo-600 text-white rounded-lg m-5 p-2" onClick={() => Buynow(course._id)}>Buy now</button>
               <button className="h-max w-max bg-indigo-600 text-white rounded-lg p-2 m-5 items-center" onClick={()=>Addtocart(course._id)}>Add To cart</button>
               </div>
            </div>
          ))}
        </div>
      </div>
)}
    
    </>
  );
}

export default AllCourses;