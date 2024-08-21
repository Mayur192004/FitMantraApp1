const express=require('express');
const app=express();
const cors=require("cors")

require('dotenv').config();
const PORT=process.env.PORT|| 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true  // Enable credentials (cookies, authorization headers)
};
app.use(express.json());
app.use(cors(corsOptions))

require("./config/database").dbConnect();

const user=require("./routes/user");
app.use("/api/v1",user);
 
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT} `); 
})


