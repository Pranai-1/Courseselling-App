
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserEmail } from "../store/selectors/userDetails"; 
import { UserState } from "../store/atoms/user"; 
import Sidebar from "./Sidebar";
import 'font-awesome/css/font-awesome.min.css';
import {  useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const[bar,setBar]=useState<boolean>(false)
  const userEmail = useRecoilValue(UserEmail); 
  const userState = useSetRecoilState(UserState); 

  function sidebar(){
   setBar((prev)=>!prev)
  }
  function closeSidebar(){
    setBar(false)
   }
   function logout(){
      localStorage.removeItem("token");
      userState({
        userEmail: null,
        purchasedCourses: [],
        cart: [],
      });
      navigate("/");
      closeSidebar()
    }
   
 
  return (
    <>
      
      <div className="fixed w-screen h-[45px] bg-slate-50 flex justify-between">

        
      <Sidebar bar={bar}  userEmail={userEmail} sidebar={sidebar} logout={logout} closeSidebar={closeSidebar}/>
        
        <h1 className="font-bold text-xl p-2 ml-2 text-red-600 ">Dev Academy</h1>
        <NavLink to="/user/courses/cart"
              className={({isActive})=>`md:hidden  mr-10 text-lg flex justify-between items-center cursor-pointer ${isActive ?"text-orange-600":"text-gray-700"} hover:text-indigo-700`}>
               <i className="fa fa-shopping-cart"></i> 
              
        </NavLink>
    
       
         <ul className="hidden md:flex md:justify-center md:items-center gap-14">
              <li>
            <NavLink to="/"
              className={({isActive})=>`md:font-medium  cursor-pointer ${isActive ?"text-orange-600":"text-gray-700"} hover:text-indigo-700`}>
                Home
              </NavLink>
              </li>
              <li>
            <NavLink to="/user/courses/all"
              className={({isActive})=>`md:font-medium  cursor-pointer ${isActive ?"text-orange-600":"text-gray-700"} hover:text-indigo-700`}>
                Courses
              </NavLink>
              </li>
              <li>
            <NavLink to="/user/courses/cart"
              className={({isActive})=>`md:font-medium  cursor-pointer ${isActive ?"text-orange-600":"text-gray-700"} hover:text-indigo-700`}>
               <i className="fa fa-shopping-cart m-2 text-lg"></i> 
               <span className="fo">Cart</span>
              </NavLink>
              </li>
              <li>
            <NavLink to="/user/courses/purchased"
              className={({isActive})=>`md:font-medium  cursor-pointer ${isActive ?"text-orange-600":"text-gray-700"} hover:text-indigo-700`}>
              
               <span className="fo">My Learning</span>
              </NavLink>
              </li>
        </ul>
        {userEmail ? (
          <>
            <div className="hidden md:flex font-bold text-white justify-center mr-5 gap-5">
              <p className="text-xs mt-3 text-black mr-5 font-normal">{userEmail}</p>
              <button 
                onClick={logout}
                className="p-1  m-1  bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex font-bold justify-start text-white w-[170px]">
              <a
                onClick={() => navigate("/user/login")}
                className="p-1 m-2 h-max w-auto bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer"
              >
                Login
              </a>
              <a
                onClick={() => navigate("/user/signup")}
                className="p-1 m-2 h-max w-auto bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer"
              >
                Signup
              </a>
            </div>
          </>
        )}

       
      </div>
      
    </>
  );
}

export default Navbar;
