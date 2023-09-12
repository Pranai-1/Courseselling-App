import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './components/Default';
import Navbar from './components/navbar';
import Signup from './components/signup';
import Login from './components/login';
import AllCourses from './components/AllCourses';
import axios from 'axios';
import { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { UserState } from './store/atoms/user';
import Cart from './components/cart';
import PurchasedCourses from './components/PurchasedCourses';
function App() {


  return (
    <>
      <Router>
      <RecoilRoot>
        <InitUser/>
      <Navbar />
      <Routes>
     
       <Route  path="/" element={<Default />} />
       <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/courses/all" element={<AllCourses />} />
        <Route path="/user/courses/cart" element={<Cart/>}/>
        <Route path="/user/courses/purchased" element={<PurchasedCourses/>}/>
       </Routes>
       </RecoilRoot>
       </Router>
    </>
  )
}


function InitUser() {
  const userState = useSetRecoilState(UserState);

  const init = async () => {
    let token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3001/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = res.data;
      if (userData.email) {
        userState({
          userEmail: userData.email,
          purchasedCourses: [], // Initialize purchased courses
          cart: [], // Initialize cart
        });
      } else {
        userState({
          userEmail: null,
          purchasedCourses: [],
          cart: [],
        });
      }
    } catch (e) {
      userState({
        userEmail: null,
        purchasedCourses: [],
        cart: [],
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return null;
}
export default App
