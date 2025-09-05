const mongoose = require("mongoose");
require("dotenv").config();

async function connection() {
    try {
        // Log the connection URI for debugging
        console.log("Mongo URI:", process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Restaurant", // Ensure this matches your database name
        });
        console.log("Connected to MongoDB Atlas");
        return conn;
    } catch (err) {
        console.error("Failed to connect to MongoDB Atlas:", err.message);
        process.exit(1);
    }
}

module.exports = connection;