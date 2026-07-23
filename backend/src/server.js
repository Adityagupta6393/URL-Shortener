import dotenv from "dotenv";
dotenv.config();
import "./config/env.js";
import "./config/redis.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {

    console.log("Stopping server...");

    await mongoose.connection.close();

    process.exit(0);

});