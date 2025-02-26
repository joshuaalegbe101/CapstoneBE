//imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
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
//app.use(cors({ origin: "http://localhost:3000" }));

//Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);


//Listener
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
})
