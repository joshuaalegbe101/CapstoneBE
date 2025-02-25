//imports
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';

//Setup
const app = express();
dotenv.config();
let PORT = process.env.PORT || 3001;

//DB Connection
connectDB();


//Middleware
app.use(express.json())

//Routes




//Listener
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})
