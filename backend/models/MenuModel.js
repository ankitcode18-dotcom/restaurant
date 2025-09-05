const { model, Types } = require("mongoose");
const { Schema } = require("mongoose");

const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    branchId: {
        type: Types.ObjectId,
        ref: "Branch",
        default: null // ✅ can be null for super admin menus
    },
    image: {
        type: String, // Image ka URL ya base64 string
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: 1 // 1: Active, 0: Inactive
    },
}, { timestamps: true });

const MenuModel = model("Menu", menuSchema);

module.exports = MenuModel;
