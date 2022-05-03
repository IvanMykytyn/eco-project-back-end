require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");
const registerRouter = require("./src/routes/registerRouter");

const app = express();

app.use(express.json());

app.use("/register", registerRouter)

module.exports = app;