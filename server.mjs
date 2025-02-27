//imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs'
import transactionRoutes from './routes/transactionRoutes.mjs';
import budgetRoutes from './routes/budgetRoutes.mjs'


//Setup
const app = express();
dotenv.config();
let PORT = process.env.PORT;

//DB Connection
connectDB();


//Middleware
app.use(express.json())
app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true 
}));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);


//Listener
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})
