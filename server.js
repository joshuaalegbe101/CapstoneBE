//imports
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Setup
const app = express();
dotenv.config();
let PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json())

//Routes







//Listen
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})
