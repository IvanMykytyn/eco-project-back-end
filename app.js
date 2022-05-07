require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");
const app = express();

const {
  GoogleAuthController,
  GoogleAuthController2,
} = require("./src/controllers/GoogleAuthController");

const {
  registerRouter,
  loginRouter,
  GoogleAuthRouter,
} = require("./src/routes");

const {
  notFoundErrorController,
} = require("./src/controllers/notFoundErrorController");

app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/auth", GoogleAuthController);

app.get("/auth/google/profile", GoogleAuthController2);

app.all("*", notFoundErrorController);

module.exports = app;
