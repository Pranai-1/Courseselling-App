import axios from "axios";
import { UserEmail } from "../store/selectors/userDetails";
import { useRecoilValue } from "recoil";
interface DisplayCourse {
    id: string;
    image: string;
    title: string;
    description: string;
    name:string,
    show:string
   
  }
  
function CourseCard(props:DisplayCourse){
let token = localStorage.getItem('token');
const userEmail=useRecoilValue(UserEmail)
const{id,image,title,description,name,show}=props


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
 
    
return(
        <>
        <div key={id}  className="bg-gray-200 m-10 h-[350px] w-[300px] rounded-lg overflow-hidden shadow-md ">
              <img className="h-[160px] w-full object-cover" src={image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0">
                <h2 className="font-bold w-full text-xl text-blue-700">{title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[20px] overflow-auto m-2 ml-1">{description}</p>
                <p className="font-medium text-m text-indigo-600 w-full h-[25px] overflow-auto">Author : {name}</p>
                </div>
                {show=="purchased" && 
                <button className="bg-green-800 text-white text-sm p-2 m-4 ml-[70px] rounded hover:bg-indigo-800 focus:outline-none">
                Watch Content
               </button>
                }
                {show=="all" &&
                    
                    <div className="flex justify-between">
                    <button className="h-max w-max bg-green-600 text-white rounded-lg m-5 p-2" onClick={()=>{Buynow(id)}}>Buy now</button>
                    <button className="h-max w-max bg-indigo-600 text-white rounded-lg p-2 m-5 items-center" onClick={()=>{Addtocart(id)}}>Add To cart</button>
                    </div>
               }
                {show=="cart" &&
                    <div className="flex justify-between">
                    <button className="bg-indigo-700 text-white text-sm p-2 m-4 mr-6 rounded hover:bg-indigo-800 focus:outline-none" onClick={() => Buynow(id)}>
                        Buy Now
                    </button>
                    <button className="bg-red-600 text-white text-sm h-max w-max p-2 m-4 ml-4 rounded hover:bg-red-700 focus:outline-none">
                        Remove 
                    </button>
                    </div>
            }
               
                
               
            </div>
        </>
    )
}



export default CourseCard