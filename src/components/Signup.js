import React from 'react'
import { useState } from 'react';
import { UserContext } from '../context/contextUser';
import { useContext } from 'react';
import { useEffect } from 'react';
import "./Signup.css"
// import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const [name, setName] = useState('');
  const {userId,setUserId } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [age,setAge] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/api/v1/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, role, email, password }),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.success==false) {
            alert(result.message);
            navigate('/login');
        } else if(result.success===true){
            alert("Registered successfully! Please Login to proceed.");
            
            setUserId(result.id);
            console.log(userId);
            navigate('/login');
        }
        
    })
    .catch(err => console.log(err));
};

console.log(userId);


  
  return (
    <div className='signuppage'>
     
      <form onSubmit={handleSubmit} className='signupform'>
      <h1 className='signin'>SignUp</h1>
        <label className='inps'><p className='inptxt1'>Name</p></label>
        <input type='text' placeholder='Enter Your Name'  onChange={(e)=>setName(e.target.value)} required  className="fillinBox1"></input>
        <label><p className='inptxt1'>Age</p></label>
        <input type='text' placeholder='Enter Your Age'  onChange={(e)=>setAge(e.target.value)} required  className="fillinBox1"></input>
        <label><p className='inptxt1'>Role</p></label>
        <select onChange={(e) => setRole(e.target.value)} value={role} className="fillinBox1" required>
        <option value="">Select Your Role</option>
        <option value="Freak">Freak</option>
        <option value="Admin">Admin</option>
        </select>
        <label><p className='inptxt1'>Email</p></label>
        <input type='email' placeholder='Enter Your Email'  onChange={(e)=>setEmail(e.target.value)} required  className="fillinBox1"></input>
        <label><p className='inptxt1'>Password</p></label>
        <input type='password' placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)} required  className="fillinBox1"></input>
        <button type='submit' className='signupbtn1'> Submit</button>
      </form>
    </div>
  )
}
