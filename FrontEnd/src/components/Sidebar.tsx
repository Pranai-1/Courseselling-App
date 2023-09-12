
import { NavLink } from 'react-router-dom'

interface Props{
bar:boolean,
userEmail:string|null,
sidebar():void,
logout():void,
closeSidebar():void
}

const Sidebar = (props:Props) => {
    let{bar,userEmail,sidebar,logout,closeSidebar}=props

  return (
    <div className="md:hidden">
    <button className="font-bold text-3xl ml-2 cursor-pointer "
        onClick={sidebar}>&#8801;
        </button>
        {bar &&(
        userEmail ?(
          <div className="h-screen bg-gray-200 w-max mt-2 p-2">
          <ul className="grid pr-8 justify-center gap-5">
          <li>
            <NavLink to="/user/courses/all" onClick={closeSidebar}
            className="font-medium text-gray-700 p-2 hover:text-orange-600">
              
             Courses
             </NavLink>
             </li>
            <li>
            <NavLink to="/user/courses/purchased" onClick={closeSidebar}
            className="font-medium text-gray-700 p-2 hover:text-orange-600">
             My Learning
             </NavLink>
             </li>
             <li>
            <NavLink to="/" onClick={logout} 
            className="font-medium text-gray-700 p-2 hover:text-orange-600">
             Logout
             </NavLink>
             </li>
          </ul>
          </div>
        ):(
          <div className="h-screen bg-gray-200 w-max mt-2 p-2">
          <ul className="grid pr-8 justify-center gap-5">
          <li>
            <NavLink to="/user/signup" onClick={closeSidebar}
            className="font-medium text-gray-700 p-2 hover:text-orange-600">
              
             Signup
             </NavLink>
             </li>
            <li>
            <NavLink to="/user/login" onClick={closeSidebar}
            className="font-medium text-gray-700 p-2 hover:text-orange-600">
             Login
             </NavLink>
             </li>
          </ul>
          </div>
        )
        )}
        </div>
  )
}
export default Sidebar