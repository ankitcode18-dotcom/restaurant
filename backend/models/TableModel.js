const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    status: { type: String, enum: ["available", "occupied"], default: "available" },
    qrCode: { type: String }, // QR Code Base64 or URL
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch', // Menu collection ka reference
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);
