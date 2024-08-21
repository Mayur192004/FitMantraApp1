const User=require("../models/User");
const Meal=require("../models/Meal");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const { user } = require("../routes/user");
require("dotenv").config();



exports.signup = async (req, res) => {
    try {
        const { name, email, role, password, age } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ name, email, role, password: hashedPassword, age });

        return res.status(201).json({
            id:newUser._id,
            success: true,
            message: "User created successfully."
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later."
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password."
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: "Password doesn't match."
            });
        }

        // Generate token
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        // Update user object to include token
        user = user.toObject(); // Convert Mongoose document to plain JavaScript object
        user.token = token;
        user.password = undefined; // Remove password from response

        // Set cookie
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // Set cookie and send the final response
        res.cookie("token", token, options);

        return res.status(200).json({
            success: true,
            token,
            user,
            message: "User logged in successfully."
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login cannot be processed at the moment. Please try again later."
        });
    }
};

exports.logout = (req, res) => {
    try {
        // Clear the token from cookies
        res.cookie("token", "", {
            expires: new Date(0), // Set expiry date to the past
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully."
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout cannot be processed at the moment. Please try again later."
        });
    }
};

exports.getMeal = async (req, res) => {
    try {
        const data = await Meal.find({});
        return res.json(data);
    } catch (err) {
        return res.status(500).json(`Error fetching meals: ${err}`);
    }
};

exports.getMealByUser = async (req, res) => {
    try {
        // Extract userId from the authenticated user's request object
        const userId = req.body; // This assumes that the user's ID is attached to req.user by your authentication middleware

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "No user ID found in the request."
            });
        }

        // Query to find meals where byUser matches the logged-in user's ID
        const meals = await Meal.find({ byUser: userId });

        return res.status(200).json({
            success: true,
            meals
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error fetching meals by user: ${err.message}`
        });
    }
};



exports.addMeal = async (req, res) => {
    if (!req.body) {
        return res.status(400).json("No data provided to post request");
    }

    const { name, mealType, calories, byUser } = req.body;

    // Check if `byUser` is provided
    if (!byUser) {
        return res.status(400).json({
            success: false,
            message: "!!!!Please LogIn.!!!!"
        });
    }

    const newMeal = new Meal({
        name,
        mealType,
        calories,
        byUser,
    });

    try {
        const savedMeal = await newMeal.save();
        return res.status(200).json({
            success: true,
            message: "Meal Added Successfully"
        });
    } catch (err) {
        // Return early if an error occurs
        return res.status(400).json(`Error while adding meal: ${err}`);
    }
};

exports.deleteMeal = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json("No ID provided for deletion");
    }

    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json("Meal not found");
        }
        
        await Meal.deleteOne({ _id: req.params.id });
        return res.status(200).json("Deleted successfully");
    } catch (err) {
        return res.status(500).json(`Error deleting meal: ${err}`);
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No user ID provided."
            });
        }

        // Find the user by ID
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Exclude sensitive data from the response
        const userDetails = user.toObject();
        userDetails.password = undefined; // Remove password from response

        // Return user details
        return res.status(200).json({
            success: true,
            user: userDetails
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user details. Please try again later."
        });
    }
};


exports.get_Meal_By_User = async (req, res) => {
    
    try {
        let data = await Meal.find({ byUser: req.params.byUser });
    // console.log(req.params.byUser);
        return res.status(200).json({
            success:true,
            meals:data
        })
        
    
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user details. Please try again later."
        });
    }
  }
  