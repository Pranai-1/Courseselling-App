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


function useCourses(){
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        axios.get("http://localhost:3001/user/courses").then((res) => {
            setCourses(res.data.courses)
               });
    }, []);
    return courses
}
export default useCourses