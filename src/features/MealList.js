// import React, { useState, useEffect, useContext } from 'react';
// import { UserContext } from '../context/contextUser';
// import './MealList.css'; // Ensure you have a CSS file for styling

// export default function MealList() {
//     const [meals, setMeals] = useState([]);
//     const { userId } = useContext(UserContext);

//     // Function to fetch meals for the user
//     const fetchMeals = async () => {
//         if (!userId) {
//             console.error('User ID is not defined.');
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:4000/api/v1/getMeal/${userId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 const errorResult = await response.json();
//                 console.error('Error fetching meals:', errorResult.message);
//                 return;
//             }

//             const result = await response.json();

//             if (result && result.meals) {
//                 setMeals(result.meals); // Assume the response has a `meals` field
//             } else {
//                 console.error('Unexpected response structure:', result);
//             }
//         } catch (err) {
//             console.error('Error fetching meals:', err);
//         }
//     };

//     useEffect(() => {
//         // Fetch meals when the component mounts or userId changes
//         fetchMeals();
//     }, [userId]);

//     // Filter meals by type
//     const breakfastMeals = meals.filter(meal => meal.mealType === 'Breakfast');
//     const lunchMeals = meals.filter(meal => meal.mealType === 'Lunch');
//     const dinnerMeals = meals.filter(meal => meal.mealType === 'Dinner');

//     return (
//         <div className='mealList'>
//             <h2>Added Meals</h2>
//             <div className='mealSection'>
//                 <div className='mealType'>
//                     <h3>Breakfast</h3>
//                     <ul>
//                         {breakfastMeals.length > 0 ? (
//                             breakfastMeals.map((meal, index) => (
//                                 <li key={`breakfast-${index}`}>
//                                     {meal.name} - {meal.calories} calories
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No Breakfast Meals</li>
//                         )}
//                     </ul>
//                 </div>
//                 <div className='mealType'>
//                     <h3>Lunch</h3>
//                     <ul>
//                         {lunchMeals.length > 0 ? (
//                             lunchMeals.map((meal, index) => (
//                                 <li key={`lunch-${index}`}>
//                                     {meal.name} - {meal.calories} calories
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No Lunch Meals</li>
//                         )}
//                     </ul>
//                 </div>
//                 <div className='mealType'>
//                     <h3>Dinner</h3>
//                     <ul>
//                         {dinnerMeals.length > 0 ? (
//                             dinnerMeals.map((meal, index) => (
//                                 <li key={`dinner-${index}`}>
//                                     {meal.name} - {meal.calories} calories
//                                 </li>
//                             ))
//                         ) : (
//                             <li>No Dinner Meals</li>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }
