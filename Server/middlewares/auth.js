const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure that environment variables are loaded
const User = require("../models/User"); // Adjust the path if necessary

// Authentication middleware


// Authentication middleware
exports.auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        // Check if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Token not found or incorrect format."
            });
        }

        // Extract token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Token is invalid."
                });
            }

            // Fetch the user from the database
            const user = await User.findById(decoded._id);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found."
                });
            }

            // Store user information in req.user
            req.user = user;
            next();
        });

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Authentication failed. Please try again later."
        });
    }
};


// Admin verification middleware
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "This route is protected for Admins only."
            });
        }
        next();
    } catch (err) {
        console.error("Admin verification error:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the Admin."
        });
    }
};

// Example endpoint that uses the middleware
exports.getBMI = async (req, res) => {
    try {
        // Example implementation of fetching BMI
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            bmi: user.bmi
        });
    } catch (error) {
        console.error("Error fetching BMI:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch BMI."
        });
    }
};
