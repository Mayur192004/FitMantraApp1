const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI('AIzaSyB7aTnL5ZFSM_Uy74g6GNh8hzD3hWtThLk'); // Ensure your API key is set correctly
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

exports.dietPlanner = async (req, res) => {
    const {
        age,
        gender,
        weight,
        height,
        activityLevel,
        dietaryRestrictions,
        healthGoals,
        budget, // Added budget field
    } = req.body;

    // Construct a prompt for the LLM
    const prompt = `
    The user is ${age} years old, ${gender}, weighs ${weight} kg, and is ${height} cm tall.
    Their activity level is ${activityLevel}, and they have the following dietary restrictions: ${dietaryRestrictions}.
    Their health goals are: ${healthGoals}. The user has a budget of ${budget} for their diet.
    Based on this information, generate a personalized diet plan including breakfast, lunch, dinner, and foods to avoid, ensuring the diet plan stays within the specified budget.
    `;

    try {
        // Generate content using Gemini model
        const result = await model.generateContent(prompt);
        const dietPlan = result.response.text();
        res.json({ dietPlan });
    } catch (error) {
        console.error('Error generating diet plan', error);
        res.status(500).json({ message: 'Error generating diet plan', error: error.message });
    }
};

