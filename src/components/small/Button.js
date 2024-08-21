import React from 'react';
import './Button.css'
import { Link } from 'react-router-dom';

const Button=({children,active,linkto})=>{
    const buttonClass = active ? 'btnhome active' : 'btnhome';
  return (
    
   <Link to={linkto} style={{textDecoration:"None" ,color:"white"}}>
        <div className={buttonClass}>
            {children}
        </div>
   </Link>
  )
}

export default Button;