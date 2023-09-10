import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserEmail } from "../store/selectors/userDetails"; 
import { UserState } from "../store/atoms/user"; 

function Navbar() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const userEmail = useRecoilValue(UserEmail); 
  const userState = useSetRecoilState(UserState); 

  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  };

  return (
    <>
      {/* navbar starting..... */}
      <div className="fixed w-screen h-[45px] bg-indigo-400 flex justify-between">
        <div className="flex">
          <div
            className="p-1 mb-1 mr-2 font-bold text-3xl cursor-pointer"
            onClick={toggleSidebar}
          >
            &#8801;
          </div>
          {showSidebar && (
            <div className="fixed top-[45px] left-0 w-[200px] h-screen p-4">
              {/* Sidebar content */}
              <ul className="text-white">
                <li
                  onClick={() => {
                    if (userEmail) {
                      navigate("/user/courses");
                    } else {
                      alert("Login to continue");
                    }
                  }}
                  className="font-medium p-2 cursor-pointer text-blue-700 hover:text-red-600"
                >
                  All Courses
                </li>
                <li
                  onClick={() => {
                    if (userEmail) {
                      navigate("/user/courses/purchased");
                    } else {
                      alert("Login to continue");
                    }
                  }}
                  className="font-medium p-2 cursor-pointer text-blue-700 hover:text-red-600"
                >
                  Purchased Courses
                </li>
                <li
                  onClick={() => {
                    if (userEmail) {
                      navigate("/user/courses/cart");
                    } else {
                      alert("Login to continue");
                    }
                  }}
                  className="font-medium p-2 cursor-pointer text-blue-700 hover:text-red-600"
                >
                  Cart
                </li>
               
              </ul>
            </div>
          )}
          <div className="font-bold text-xl p-2 text-red-600">Dev Academy</div>
        </div>
        <ul className="hidden md:flex">
          <li className="md:font-medium md:p-2 md:m-1 cursor-pointer hover:text-indigo-700">
            Home
          </li>
          <li className="md:font-medium md:p-2 md:m-1 cursor-pointer hover:text-indigo-700">
            About Us
          </li>
          <li className="md:font-medium md:p-2 md:m-1 cursor-pointer hover:text-indigo-700">
            Contact Us
          </li>
        </ul>
        {userEmail ? (
          <>
            <div className="hidden md:flex font-bold text-white">
              <p className="text-xs mt-3 text-black mr-5">{userEmail}</p>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  userState({
                    userEmail: null,
                    purchasedCourses: [],
                    cart: [],
                  });
                  navigate("/");
                }}
                className="p-1 mt-1.5 m-1 h-max w-auto bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer mr-7"
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

        <div className="font-bold text-2xl mr-2 cursor-pointer md:hidden">
          <a href="#">&#8801;</a>
        </div>
      </div>
      {/* navbar ending.... */}
    </>
  );
}

export default Navbar;
