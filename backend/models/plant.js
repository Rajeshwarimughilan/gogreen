const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    species: { type: String, required: true },
    description: { type: String },
    wateringInterval: { type: String, required: true },
    geographicalOrigin: { type: String },
    sunlightRequirements: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("plant", plantSchema);