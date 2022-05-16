require("dotenv").config();
require("./src/configs/database").connect();
const cors = require("cors");
const express = require("express");
const app = express();

const {GoogleAuthRedirect, GoogleAuthController, notFoundErrorController} = require("./src/controllers");

const { registerRouter, loginRouter, activitiesRouter, taskRouter } = require("./src/routes");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/activities", activitiesRouter)
app.use("/task", taskRouter)

// url for register or login
app.get("/auth/google", GoogleAuthRedirect);
// url for redirecting
app.get("/auth/google/profile", GoogleAuthController);

app.all("*", notFoundErrorController);

module.exports = app;
