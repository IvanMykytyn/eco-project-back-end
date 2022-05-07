require("dotenv").config();
require("./src/configs/database").connect();
const express = require("express");
const app = express();

const {
  GoogleAuthRedirect,
  GoogleAuthController,
} = require("./src/controllers/GoogleAuthController");

const { registerRouter, loginRouter } = require("./src/routes");

const {
  notFoundErrorController,
} = require("./src/controllers/notFoundErrorController");

app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/auth", GoogleAuthRedirect);
app.get("/auth/google/profile", GoogleAuthController);

app.all("*", notFoundErrorController);

module.exports = app;
