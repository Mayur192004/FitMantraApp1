import React, { useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Navbar({ isLoggedin }) {
  const location =useLocation();
  const {token} = useSelector((state)=>state.auth);
  return (
    <div className='navmain'>
      <Link to="/">
        <img
          src='https://dl.memuplay.com/new_market/img/com.appsinnova.android.bloodpressure.icon.2023-09-12-21-05-05.png'
          width={60} height={60} loading="lazy" className='logo'
          alt="Logo"
        />
      </Link>
      <div className='navcontent'>
        <Link to="/" className="navText">Home</Link>
        <Link to="/track" className="navText">Track Fitness</Link>
        <Link to="/learn" className="navText">Learn</Link>
        <Link to="/about" className="navText">About</Link>
        <Link to="/contact" className="navText">Contact</Link>
      </div>

      <div className='navbtns'>
        {token ? (
          <Link to='/logout' className='btn1'>
            Logout
          </Link>
        ) : (
          <>
            <Link to='/login' className='btn1'>
              Login
            </Link>
            <Link to='/signup' className='btn2'>
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
