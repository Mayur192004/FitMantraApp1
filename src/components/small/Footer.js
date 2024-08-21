import React from "react";
import './Footer.css';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";


function Footer(){
  return(
    <div className="Nav">
      <div className="header1">
        <div className="title">
          <h1>Ready to get started?</h1>
        </div>
        <div className="contactbtn">
          <button className="contbutton">contact us</button>
        </div>
      </div>
      <div className="team">
        <div className="teamdetails">
          <div className="myteam">
            <div className="teamname">
              <h2>FitMantra</h2>
            </div>
            <div className="navbuttons">
             <> <Link to={"/"} className="navbtns1">home</Link></>
              <Link to={"/about"}className="navbtns1">about</Link>
            </div>
          </div>
          <div className="contactdetails">
            <span>987 Hillcrest Lane <br />Irvinr, CA <br />California 92714 <br />Call us:9999999999</span>
          </div>
        </div>
        <div className="socials">
          <div className="socialhandles">
          <a href="https://www.facebook.com/" target="_blank"><button className="socialbuttons"><FaSquareFacebook style={{color:'white', fontSize:'1.6rem'}}/></button></a>
           <a href="https://www.pinterest.com/" target="_blank"><button className="socialbuttons"><FaPinterest style={{color:'white', fontSize:'1.6rem'}}/></button></a>
           <a href="https://twitter.com/" target="_blank"><button className="socialbuttons"><FaXTwitter style={{color:'white', fontSize:'1.6rem'}}/></button></a>
           <a href="https://instagram.com/" target="_blank"><button className="socialbuttons"><FaInstagram style={{color:'white', fontSize:'1.6rem'}}/></button></a>
          </div>
          <div className="copyright">
            <span>Copyright 2024. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

