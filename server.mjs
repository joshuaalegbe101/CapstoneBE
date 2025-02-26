//imports
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import transactionRoutes from './routes/transactionRoutes.mjs';

//Setup
const app = express();
dotenv.config();
let PORT = process.env.PORT || 3001;

//DB Connection
connectDB();


//Middleware
app.use(express.json())

//Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);



//Listener
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})
