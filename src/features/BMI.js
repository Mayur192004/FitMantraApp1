import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BMI.css';
import Navbar from '../components/Navbar';



const BMI = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);

    const calculateBMI = () => {
        if (!weight || !height) {
            alert('Please enter both weight and height.');
            return;
        }

        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBMI(bmiValue.toFixed(2));
    };

    return (
        <div
          
        >
            <Navbar />
            <div className="bmi-calculator"
            whileHover={{ scale: 1.05, rotateZ: 3 }}
            transition={{ type: 'spring', stiffness: 300 }}
            >
                <h2>BMI Calculator</h2>
                <div className="input-container">
                    <label>Weight (kg):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight in kg"
                    />
                </div>
                <div className="input-container">
                    <label>Height (cm):</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Enter height in cm"
                    />
                </div>
                <button className="calculate-btn" onClick={calculateBMI}>Calculate BMI</button>
                {bmi !== null && (
                    <div className="result">
                        <h3>Your BMI: {bmi}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BMI;
