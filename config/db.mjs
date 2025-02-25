import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.mongoURI;

async function connectDB() {
    try {
        await mongoose.connect(db);
        console.log('Mongo Db connected');

    } catch (err) {
        console.error(err);

        process.exit(1);
    }
}

export default connectDB;