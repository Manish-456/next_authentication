import mongoose from "mongoose";

export async function connect() {
    try {
         mongoose.connect(process.env.MONGO_DB_URL!);

        const connection = mongoose.connection;
        
        connection.on('connnected', () => {
        console.log("MongoDB connected successfully");
        })

        connection.on('error', () => {
        console.log("MongoDB connection error. Please make sure MongoDB is running.")
        process.exit()
        })
    } catch (error) {
         console.log("Something went wrong!");
         console.log(error);
    }
}