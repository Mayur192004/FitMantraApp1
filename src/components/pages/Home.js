import React from 'react'
import Navbar from '../Navbar'
import './Home.css'
import CTAbutton from '../small/Button'
import Footer from '../small/Footer'
import {FaArrowRight} from 'react-icons/fa';
import { UserContext } from '../../context/contextUser';
import { useContext } from 'react';

export default function Home() {
  const {userId,userName,userRole}=useContext(UserContext);
  console.log("Home:",userId)
  console.log("Home:",userName)
  console.log("Home:",userRole);
  return (
    <div className='homePage' >
      <Navbar />
      <div className='homePageMain'>
        <div className='uppercontent'>
          <h1 className='header'>Empower Your Life with <span style={{"color":"red"}}> Being Fit..</span></h1>
          <div className='para1'>Being healthy and fit increases our energy level, improves confidence, burns calories, minimizes complications of chronic diseases and increases life term.
            Our health and fitness is related to the many health benefits.</div>
          </div>
          <div className='twobtns'>
                <CTAbutton active={true} linkto={"/signup"}>
                    Learn More
                </CTAbutton>
                <CTAbutton active={false} linkto={"/signup"}>
                    Book a Demo
                </CTAbutton>
          </div>
          <div className='imgdivmain'>
            <div className='imgsubmain'></div>
            <img className='imghome'src='https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2024/02/45.jpg?quality=86&strip=all'></img>
            <div className='imgsubmain2'></div>
  
          </div>
          
        </div>

        <div className='homePageSection2'>
           <div className='section2'>
              
              <div className='section2ImgDiv'>
                <img src='https://cdn.tinybuddha.com/wp-content/uploads/2013/07/Meditating-1.jpg' className='section2Img'></img>
              </div>
              <div className='section2Content'>
                <div className='section2heading'>Unleash Your Inner Strength with the <span style={{color:"aqua"}}> Power of Meditation</span></div>
                <p className='para2'>Meditation fosters inner peace and clarity through focused attention or mindfulness practices. It cultivates self-awareness, reduces stress, enhances mental clarity, and promotes overall well-being through regular practice and mindful presence.</p>
                <CTAbutton active={true} linkto={"/signup"} style={{display:"flex"}}>
                    Explore Now <span><FaArrowRight/></span>
                </CTAbutton>
              </div>
              
           </div>
        </div>
        <Footer/>
    </div>
  )
}
