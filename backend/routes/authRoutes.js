const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async(req,res) =>{
try{
    const {username, email, password} = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        passwordHash: hashedPassword
    }); 

    await user.save();

    const token = jwt.sign({ userid: user._id, username: user.username}, JWT_SECRET,{
        expiresIn: "24h",
    });

    res.status(201).json({
        message: "succesfully registered",
        token,
        user:{
            userid: user._id,
            username: user.username,
            email: user.email
        },
    });
}catch(err){
    res.status(500).json({ error: "Internal server error" });   
}
}
);


router.post("/login", async(req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error: "Invalid username or password"});
        }

        const isPasswordcorrect = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordcorrect){
            return res.status(401).json({error: "Invalid username or password"});
    }

    const token = jwt.sign({userid: user._id, username: user.username}, JWT_SECRET,{
        expiresIn: "24h",
    });

    res.status(200).json({
        message: "succesfully logged in",
        token,
        user:{
            userid: user._id,
            username: user.username,
            email: user.email
        },
    });
}catch(err){
    res.status(500).json({ error: "Internal server error" });
        }
}

);

module.exports = router;