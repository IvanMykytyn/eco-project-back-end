require("dotenv").config();
require("./src/configs/database").connect();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

const {GoogleAuthRedirect, GoogleAuthController, notFoundErrorController} = require("./src/controllers");

const { registerRouter, loginRouter, activitiesRouter, taskRouter, taskHistoryRouter } = require("./src/routes");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/activities", activitiesRouter)
app.use("/task", taskRouter)
app.use("/taskHistory", taskHistoryRouter)

// url for register or login
app.get("/auth/google", GoogleAuthRedirect);
// url for redirecting
app.get("/auth/google/profile", GoogleAuthController);

app.all("*", notFoundErrorController);

module.exports = app;
