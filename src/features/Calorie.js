import React from 'react'
import AddMeal from './AddMeal'
import MealList from './MealList'
import './Calorie.css'
export default function Calorie() {
  return (
    <div className='calory-tracker'>
      <div className='heading'>
      <p className='mealHeader'>Meal Tracker</p>
      </div>
      <div className='addmeal'><AddMeal/></div>
      
      
    </div>
  )
}
