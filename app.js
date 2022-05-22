require("dotenv").config();
require("./src/configs/database").connect();
const cors = require("cors");
const express = require("express");
const app = express();

const {
  registerRouter,
  loginRouter,
  googleAuthRouter,
} = require("./src/routes");

const {
  notFoundErrorController,
} = require("./src/controllers/notFoundErrorController");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/auth/google", googleAuthRouter);

app.all("*", notFoundErrorController);

module.exports = app;
