require("dotenv").config();
require("./src/configs/database").connect();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();

const {
    notFoundErrorController
} = require("./src/controllers");


const {
    registerRouter, loginRouter, activitiesRouter, taskRouter, taskHistoryRouter, userInformationRouter,
    ratingRouter, googleAuthRouter, tasksDoneAmountRouter, userPointsRouter
} = require("./src/routes");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/activities", activitiesRouter);
app.use("/task", taskRouter);
app.use("/taskHistory", taskHistoryRouter);
app.use("/userInformation", userInformationRouter);
app.use("/rating", ratingRouter);
//app.use("/auth/google", googleAuthRouter);
app.use("/tasks/done", tasksDoneAmountRouter);
app.use("/user/points", userPointsRouter)

app.all("*", notFoundErrorController);

module.exports = app;
