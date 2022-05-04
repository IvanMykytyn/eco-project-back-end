require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");
const app = express();

const registerRouter = require("./src/routes/registerRouter");
const loginRouter = require("./src/routes/loginRouter");

app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);

module.exports = app;
