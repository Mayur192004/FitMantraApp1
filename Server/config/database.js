const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)

    .then(()=>{
        console.log("Database Connection successfull");
    })

    .catch((error)=>{
        console.log("Issue in DB connection");
        console.log(error);
        process.exit(1);
    })
}