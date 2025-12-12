const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    species: {type: String, required: true},
    description: {type: String},
    wateringInterval: {type: Number, required: true},
    geographicalOrigin: {type: String},
    sunlightRequirements: {type: String},
    imageUrl: {type: String}    
});

module.exports = mongoose.model("plant", plantSchema);