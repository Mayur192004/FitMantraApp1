import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/contextUser';
import './AddMeal.css';
import { BarChart } from '@mui/x-charts/BarChart';  
import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux'; 

export default function AddMeal() {
    const [name, setName] = useState('');
    const [mealType, setMealType] = useState('');
    const [calories, setCalories] = useState('');
    const { token } = useSelector((state) => state.auth);
    
    const [meals, setMeals] = useState([]);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        // If token and userId are available, fetch meals or load from localStorage
        if (token && userId) {
            const storedMeals = localStorage.getItem('meals');
            if (storedMeals) {
                setMeals(JSON.parse(storedMeals));
            } else {
                fetchMeals();
            }
        } else {
            // Clear meals from state and localStorage if not logged in
            setMeals([]);
            localStorage.removeItem('meals');
        }
    }, [userId, token]);

    const fetchMeals = async () => {
        if (!userId) {
            console.error('User ID is not defined.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:4000/api/v1/getMeal/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (!response.ok) {
                const errorResult = await response.json();
                console.error('Error fetching meals:', errorResult.message);
                return;
            }
    
            const result = await response.json();
    
            if (result && result.meals) {
                setMeals(result.meals);
                localStorage.setItem('meals', JSON.stringify(result.meals));
            } else {
                console.error('Unexpected response structure:', result);
            }
        } catch (err) {
            console.error('Error fetching meals:', err);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/v1/addMeal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, mealType, calories, byUser: userId })
            });

            const result = await response.json();

            if (result.success === true) {
                const newMeals = [...meals, { name, mealType, calories }];
                setMeals(newMeals);
                localStorage.setItem('meals', JSON.stringify(newMeals));
                console.log("Meal Added Successfully");
                alert('Meal Added Successfully');
                setName('');
                setMealType('');
                setCalories('');
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log('Updated Meals List:', meals);
    }, [meals]);

    const breakfastMeals = meals.filter(meal => meal.mealType === 'Breakfast');
    const lunchMeals = meals.filter(meal => meal.mealType === 'Lunch');
    const dinnerMeals = meals.filter(meal => meal.mealType === 'Dinner');

    const totalCalories = (mealList) => {
        return mealList.reduce((total, meal) => total + parseInt(meal.calories, 10), 0);
    };

    const chartData = [
        { id: 0, value: totalCalories(breakfastMeals), label: 'BF' },
        { id: 1, value: totalCalories(lunchMeals), label: 'L' },
        { id: 2, value: totalCalories(dinnerMeals), label: 'D' }
    ];

    const barChartData = [
        { group: 'Breakfast', calories: totalCalories(breakfastMeals) },
        { group: 'Lunch', calories: totalCalories(lunchMeals) },
        { group: 'Dinner', calories: totalCalories(dinnerMeals) }
    ];

    const renderTable = (mealList) => (
        <table className="mealTable">
            <thead>
                <tr>
                    <th>Sr. No</th>
                    <th>Meal</th>
                    <th>Calories</th>
                </tr>
            </thead>
            <tbody>
                {mealList.length > 0 ? (
                    mealList.map((meal, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{meal.name}</td>
                            <td>{meal.calories}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No Meals Available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    return (
        <div className='addMealPage'>
            <div className='mainContent'>
                <div className='loginCardContainer'>
                    <div className='loginCard1'>
                        <h1 className='signin'>Add Meal</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='loginInput1'>
                                <input
                                    required
                                    type="text"
                                    id='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter the meal name"
                                    className="fillinBox"
                                />
                                <select onChange={(e) => setMealType(e.target.value)} value={mealType} className="fillinBox1" required>
                                    <option value="">Select Meal Type</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </select>
                                <input
                                    required
                                    type="number"
                                    id='calorie'
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    placeholder="Enter the Calories"
                                    className="fillinBox"
                                />
                            </div>
                            <div className='btns1'>
                                <button type='submit' className='loginbtn'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='charts'>
                    <div className='pieChartContainer'>
                        <PieChart
                            series={[
                                {
                                    data: chartData,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            height={200}
                        />
                    </div>
                    <div className='chartContainer'>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: barChartData.map(item => item.group) }]}
                            series={[{ data: barChartData.map(item => item.calories) }]}
                            width={600}
                            height={300}
                        />
                    </div>
                </div>
            </div>
            <div className='grad'></div>
            <div className='mealList'>
                <h2 className='head21'>Your Meals History</h2>
                <div className='mealSection'>
                    <div className='mealType'>
                        <h3>Breakfast</h3>
                        {renderTable(breakfastMeals)}
                    </div>
                    <div className='mealType'>
                        <h3>Lunch</h3>
                        {renderTable(lunchMeals)}
                    </div>
                    <div className='mealType'>
                        <h3>Dinner</h3>
                        {renderTable(dinnerMeals)}
                    </div>
                </div>
            </div>
        </div>
    );
}
