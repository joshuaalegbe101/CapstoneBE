import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
dotenv.config();
let PORT = process.env.PORT || 3001;


//Listen
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})
