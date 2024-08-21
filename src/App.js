import './App.css';
import { useState } from 'react'; // Import useState hook
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation hook
import Navbar from './components/Navbar';
import Home from "./components/pages/Home";
import Learn from "./components/pages/Learn";
import Track from "./components/pages/Track";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';
import {Toaster } from 'react-hot-toast';
import BMI from './features/BMI';
import Diet from './features/Dite';
import Calorie from './features/Calorie';
import Steps from './features/Steps';
import Logout from './components/Logout';
axios.defaults.baseURL ='http://localhost:3000';
axios.defaults.withCredentials=true;


function App() {
  const location = useLocation(); // Get current location object

  // Conditionally render Navbar except on /login route
  let shouldRenderNavbar = location.pathname !== '/login';
  const [isLoggedin,setisLoggedin] = useState(false);


  return (
    <div>
      {/* {shouldRenderNavbar && <Navbar/>} */}
      <Toaster position='bottom-right' toastOptions={{duration:2000}}></Toaster>
      <Routes>
        <Route path='/' element={<Home isLoggedin={isLoggedin} />} />
        <Route path='/learn' element={<Learn isLoggedin={isLoggedin} />} />
        <Route path='/login' element={<Login isLoggedin={isLoggedin} setisLoggedin={setisLoggedin} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/track' element={<Track  isLoggedin={isLoggedin} />} />
        <Route path='/about' element={<About  isLoggedin={isLoggedin}  />} />
        <Route path='/contact' element={<Contact  isLoggedin={isLoggedin} />} />
        <Route path='/bmi' element={<BMI/>}></Route>
          <Route path='/calory' element={<Calorie />}></Route>
          <Route path='/diettracker' element={<Diet />}></Route>
          <Route path='/steps' element={<Steps/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
