import React ,{ useState } from "react";
import {FaArrowRight} from 'react-icons/fa';
import './OneCard.css'
import { Link } from "react-router-dom";
function OneCard({id,name,info,image,price,linkto}){
    
    const [readmore,setReadmore]=useState(false);
    function readmoreHandler(){
        setReadmore(!readmore);
    }
   
    const description=readmore?info:`${info.substring(0,200)}....`;
    return(
    <div className="one_card">
        <img src={image} alt="Image" className="image"></img>
        <div className="tour-info">
        <div className="tour ">
            <h3 className="price">{price}</h3>
            <h3 className="name">{name}</h3>
            </div>
            <div className="info">
                {description}
                <span  onClick={readmoreHandler} className="readmore">{readmore?`show less`:`readmore`}</span>
            </div >
            <Link to={linkto} style={{"textDecoration":"none"}}>
            <div className="btn1main" style={{"textDecoration":"none"}}>
              <div className="btn1in" style={{"textDecoration":"none"}}>
              <p style={{"textDecoration":"none"}}>Explore it</p>
               <FaArrowRight/>
              </div>
              
            </div>
            </Link>
           
            </div>
            

    </div>
    )
    ;
}

export default OneCard;