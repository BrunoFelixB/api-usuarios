const express = require("express");
const app = express();

require("dotenv-safe").config();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const userRoutes = require("./routes/usersRoutes")

app.use("/", userRoutes);

module.exports = app;