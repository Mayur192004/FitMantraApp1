import React, { useState } from 'react';
import Navbar from '../Navbar';
import "./Track.css";
import Cards from '../small/Cards';
import { Route,Routes } from 'react-router-dom';
import BMI from '../../features/BMI';
import Calorie from '../../features/Calorie';
import Diet from '../../features/Dite';
import Steps from '../../features/Steps';

const data = [
  {
    id: 1,
    name: "BMI calculator",
    info: "Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters. A high BMI can indicate high body fatness.",
    image: "https://www.shutterstock.com/image-vector/cartoon-illustration-bmi-vector-medical-600nw-2156738433.jpg",
    linkto:"/bmi"
  },
  {
    id: 2,
    name: "Calories Gained",
    info: " A small calorie (cal) is the amount of energy required to raise the temperature of 1 gram (g) of water by 1º Celsius (º C). A large calorie (kcal) is the amount of energy required to raise 1 kilogram (kg) of water by 1º C. It is also known as a kilocalorie.",
    image: "https://cheatdaydesign.com/wp-content/uploads/2019/07/Helpful-Weight-Gain-Foods.jpg.webp",
    linkto:"/calory"
  },
  {
    id: 3,
    name: "Diet Tracker",
    info: "Nutrition apps are powerful tools that empower individuals to take control of their dietary habits and improve their overall health and well-being",
    image: "https://cdn-icons-png.flaticon.com/512/2117/2117213.png",
    linkto:"/diettracker"
  },
  // {
  //   id: 4,
  //   name: "Step Counts",
  //   info: "It adds up all the steps you take during the day. It can help motivate you to walk. A quick check may show that you need more steps for the day and help you set goals to take more steps. Some also can show you how many calories yo've burned.",
  //   image: "https://play-lh.googleusercontent.com/x3NOGZ3oPTZZAIbT1KxaJFubC8hFkjtJPe37Q0s1Fnn2pnvOLYiuYjem6dFobtU5m9g",
  //   linkto:"/steps"
  // },
 
  
];

const Track = ({ isLoggedin }) => {
  const [features,setFeature]=useState(data);


  return (
    <div className='trackPage'>
      <Navbar isLoggedin={isLoggedin} />
     
      <div className='trackPageMain'>
        <div className='headers'>
          <h1 className='head1'>Hey there!!! Welcome To <span style={{ "color": "aqua" }}>&nbsp;FitMantra</span></h1>
          <h2 className='head2'>So Let's Start Your <span style={{ "color": "orange" }}>&nbsp;Journey Now</span></h2>
        </div>

        <div className='cards'>
         <Cards features={features}></Cards>
        </div>

      </div>
    </div>
  );
};

export default Track;
