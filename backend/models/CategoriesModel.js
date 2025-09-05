const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu', // Menu collection ka reference
        required: true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch', // Menu collection ka reference
        required: true
    },
    min_Price: {
        type: Number,
        default: 0
    },
    max_Price: {
        type: Number,
        default: 1
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

module.exports = mongoose.model('Categories', categoriesSchema);
