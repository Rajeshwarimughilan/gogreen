const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Plant = require("../models/plant");

router.post("/plants", authMiddleware, async (req, res) => {
    try{
        const {title, species, description, wateringInterval, geographicalOrigin, sunlightRequirements, imageUrl} = req.body;
        const newPlant = new Plant({
            userid: req.user.userid,
            title,
            species,
            description,
            wateringInterval,
            geographicalOrigin,
            sunlightRequirements,
            imageUrl
        });
        await newPlant.save();
        res.status(201).json(newPlant);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

router.get("/plants" ,authMiddleware, async (req,res) => {
    try{
        const plants = await Plant.find({userid: req.user.userid});
        res.json(plants);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

router.get("/plants/:id", async (req, res) => {
    try{
        const plant = await Plant.findById(req.params.id);
        if(!plant){
            return res.status(404).json({error: "Plant not found"});
        }
        res.json(plant);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

router.put("/plants/:id", authMiddleware, async (req, res) => {
    try{

        const {title, species, description, wateringInterval, geographicalOrigin, sunlightRequirements, imageUrl} = req.body;
        const updatedPlant = await Plant.findOneAndUpdate(
            {_id: req.params.id, userid: req.user.userid},
            {title, species, description, wateringInterval, geographicalOrigin, sunlightRequirements, imageUrl},
            {new: true}
        );
        if(!updatedPlant){
            return res.status(404).json({error: "Plant not found or unauthorized"});
        }   
        res.json(updatedPlant);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

router.delete("/plants/:id", authMiddleware, async (req, res) => {
    try{
        const deleted = await Plant.findOneAndDelete({_id: req.params.id, userid: req.user.userid});
        if(!deleted){
            return res.status(404).json({error: "Plant not found or unauthorized"});
        }
        res.json({message: "Plant deleted successfully"});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;