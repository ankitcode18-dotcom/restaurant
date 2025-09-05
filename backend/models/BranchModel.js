const mongoose = require("mongoose");


const BranchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Branch name is required"],
            trim: true,
            maxlength: [100, "Branch name cannot exceed 100 characters"],
        },
        branchId: {
            type: String,
            required: [true, "Branch id is required"],
            unique: true,
            trim: true,
        }, password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        },
        image: {
            type: String
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        address: {
            street: {
                type: String,
                required: [true, "Street address is required"],
                trim: true
            },
            city: {
                type: String,
                required: [true, "City is required"],
                trim: true
            },
            state: {
                type: String,
                required: [true, "State is required"],
                trim: true
            },
            pincode: {
                type: String,
                required: [true, "Pincode is required"],
                trim: true
            }
        },
        contact: {
            phone: {
                type: String,
                required: [true, "Phone number is required"],
                match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
            },
            email: {
                type: String,
                lowercase: true,
                trim: true,
                match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
            }
        },
        isActive: {
            type: Boolean,
            default: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true // Automatically adds createdAt & updatedAt
    }
);

// Index for faster searching by name
// BranchSchema.index({ name: 1, branchId: 1 });

module.exports = mongoose.model("Branch", BranchSchema);

