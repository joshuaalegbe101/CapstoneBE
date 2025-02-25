import mongoose from "mongoose";

const db = process.env.mongoURI;

async function connectDB() {
    try {
        await mongoose.connect(db);
    } catch (error) {

    }
}