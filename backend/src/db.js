const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("connected to the database");
}).catch((err) => {
    console.error("Database connection error:", err);
});   
