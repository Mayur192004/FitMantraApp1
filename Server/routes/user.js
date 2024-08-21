const express = require("express");
const router = express.Router();
const cors = require("cors");
const controllers=require("../controllers/Auth")
const {
    signup,
    login,
    logout,
    getMeal,
    getMealByUser,
    get_Meal_By_User,
    addMeal,
    deleteMeal,
    getUserDetails
} = require("../controllers/Auth");
const { auth, isAdmin } = require("../middlewares/auth");

// Enable CORS for your frontend
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// User authentication routes
router.post("/login", login);
router.post('/signup', signup);
router.get('/getUserDetails', getUserDetails);

// Admin route (protected)
router.get('/admin', auth, isAdmin, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Hello there, You are welcomed Admin!!"
    });
});

// Meal routes
router.get("/getMeal", getMeal);
router.post("/addMeal", addMeal);
router.delete("/meal/:id", deleteMeal);

// Updated route to fetch meals by user
// Use query parameters instead of path parameters for GET requests
router.get("/getMealsByUser", getMealByUser);
router.get("/getMeal/:byUser",get_Meal_By_User);
router.post("/logout",logout)

module.exports = router;
