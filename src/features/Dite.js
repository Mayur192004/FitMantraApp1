import React, { useState } from 'react';
import './Dite.css'; // Update CSS file name accordingly

function DietPlan() {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        activityLevel: '',
        dietaryRestrictions: '',
        healthGoals: '',
        budget: '',  // Added budget field
    });

    const [dietPlan, setDietPlan] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/v1/diettracker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            setDietPlan(data.dietPlan);
        } catch (error) {
            console.error('Error generating diet plan', error);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input className="input-field" name="age" placeholder="Age" onChange={handleChange} />
                    <input className="input-field" name="gender" placeholder="Gender" onChange={handleChange} />
                    <input className="input-field" name="weight" placeholder="Weight (kg)" onChange={handleChange} />
                    <input className="input-field" name="height" placeholder="Height (cm)" onChange={handleChange} />
                    <input className="input-field" name="activityLevel" placeholder="Activity Level (e.g., Sedentary, Active)" onChange={handleChange} />
                    <input className="input-field" name="dietaryRestrictions" placeholder="Dietary Restrictions (if any)" onChange={handleChange} />
                    <input className="input-field" name="healthGoals" placeholder="Health Goals (e.g., Weight loss, Muscle gain)" onChange={handleChange} />
                    <input className="input-field" name="budget" placeholder="Budget (e.g., 50 USD per week)" onChange={handleChange} /> {/* New Budget Field */}
                    <button className="submit-button" type="submit">Generate Diet Plan</button>
                </form>
            </div>
            <div className="plan-container">
                <textarea 
                    className="plan-textarea"
                    value={dietPlan} 
                    readOnly 
                    placeholder="Generated Diet Plan will appear here"
                    rows="10"
                    cols="50"
                />
            </div>
        </div>
    );
}

export default DietPlan;
