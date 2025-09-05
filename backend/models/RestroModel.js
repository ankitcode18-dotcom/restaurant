const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const restroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    restroId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Restro', restroSchema);