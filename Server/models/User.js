const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Freak"],
        required: true,
    },
    bmi: {
        type: Number
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
