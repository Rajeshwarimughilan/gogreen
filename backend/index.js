const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./src/db");

const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");

const PORT = process.env.PORT || 3000;
const DEPLOYED_URL = "https://gogreen-xkeh.onrender.com";

app.use(cors({
    origin: [DEPLOYED_URL, "http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

app.use(authRoutes);
app.use(plantRoutes);

app.get("/", (req, res) =>{
    res.send("Plants spread positivity1");
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})