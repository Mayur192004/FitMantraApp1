const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mealType: {
        type: String,
    },
    calories: {
        type: Number,
    },
    // Reference to the User model
    byUser: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
