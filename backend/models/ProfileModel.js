const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    googleId: { type: String, unique: true }, // Google ka unique ID (payload.sub)
    clientId: String, // Google clientId bhi rakh sakte ho
    name: String,
    email: { type: String, unique: true },
    picture: String,
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);