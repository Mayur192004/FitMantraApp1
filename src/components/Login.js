import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { UserContext, UserProvider } from '../context/contextUser';
import { useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux';


import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { setToken } from '../Slices/AuthSlice';

export default function Login({isLoggedin,setisLoggedin}) {
    const [email, setEmail] = useState('');
    const {userId,setUserId ,userName,setUserName,setUserRole,userRole} = useContext(UserContext);
   
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Get current location object
    
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:4000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const result = await response.json();
    
            console.log(result);
            console.log(result.token);
            dispatch(setToken(result.token));

            localStorage.setItem("token",JSON.stringify(result.token));
    
            if (result.success === true) {
                setisLoggedin(true);
                console.log("Login Success");
                alert('Login successful!');
                setUserId(result.user._id);
                setUserName(result.user.name);
                setUserRole(result.user.role);
                navigate('/');
                // console.log(result.user._id)
                
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
        }
    }
    const gotoHome =()=>{
        navigate("/");
    }
    

    // Conditionally render Navbar except on /login route
    let shouldRenderNavbar = location.pathname !== '/login';

    return (
        <div className='loginPage'>
            {shouldRenderNavbar && <Navbar isLoggedin={isLoggedin} />} {/* Pass updated state */}
            
            <div className='loginCard'>
                <h1 className='signin'>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='loginInput'>
                        <label className='inps' htmlFor='emailadd'>
                            <p className='inptxt'>Email Address</p>
                        </label>
                        <input
                            required
                            type="text"
                            id='emailadd'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="fillinBox"
                        />

                        <label className='inps' htmlFor='pass'>
                            <p className='inptxt'>Password</p>
                        </label>
                        <input
                            required
                            type="password"
                            id='pass'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className="fillinBox"
                        />
                    </div>
                    <div className='btns'>
                        <button type='submit' className='loginbtn'>Login</button>
                        <div style={{ "textAlign": "center" }}>OR</div>
                        <div className='line'></div>
                        <Link to="/signup" className='signupbtn'>Signup</Link>
                    </div>
                </form>
            </div>
            
        </div>
    );
}
