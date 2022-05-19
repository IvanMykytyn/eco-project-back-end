require("dotenv").config();
require("./src/configs/database").connect();
const cors = require("cors");
const express = require("express");
const app = express();

const {
  GoogleAuthRedirect,
  GoogleAuthController,
  notFoundErrorController,
} = require("./src/controllers");

const {
  registerRouter,
  loginRouter,
  activitiesRouter,
  taskRouter,
  ratingRouter,
} = require("./src/routes");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/activities", activitiesRouter);
app.use("/task", taskRouter);
app.use("/rating", ratingRouter);

// url for register or login
app.get("/auth/google", GoogleAuthRedirect);
// url for redirecting
app.get("/auth/google/profile", GoogleAuthController);

app.all("*", notFoundErrorController);

module.exports = app;
