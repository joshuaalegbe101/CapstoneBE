import mongoose from "mongoose";

const db = process.env.mongoURI;

async function connectDB() {
    try {
        await mongoose.connect(db);
        console.log('Mongo Db connected')

    } catch (err) {
        console.error(err);

        process.exit(1);
    }
}

export default connectDB;