const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: 100
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            unique: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        },
        phone: {
            type: String,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
        },
        role: {
            type: String,
            enum: ["super_admin", "branch_admin", "manager", "staff","user"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);