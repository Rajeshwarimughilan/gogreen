const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./src/db");

const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(plantRoutes);

app.get("/", (req, res) =>{
    res.send("Plants spread positivity1");
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})