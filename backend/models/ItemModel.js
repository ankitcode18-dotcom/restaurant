const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch', // Menu collection ka reference
        required: true
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu', // Menu collection ka reference
        required: true
    },
    categoriesId: {
        type: Schema.Types.ObjectId,
        ref: 'Categories', // Menu collection ka reference
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    foodType: {   // ✅ Veg/Non-Veg/Vegan/Jain
        type: String,
        enum: ["Veg", "Non-Veg"]
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
