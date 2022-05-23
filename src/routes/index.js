const loginRouter = require("./loginRouter")
const registerRouter = require("./registerRouter")
const activitiesRouter = require("./activitiesRouter")
const taskRouter = require("./taskRouter")
const taskHistoryRouter = require("./taskHistoryRouter");
const userInformationRouter = require("./userInformationRouter")
const ratingRouter = require("./ratingRouter");
const googleAuthRouter = require("./googleAuthRouter");
const tasksDoneAmountRouter = require("./tasksDoneAmountRouter")

module.exports = {
    loginRouter,
    registerRouter,
    activitiesRouter,
    taskRouter,
    taskHistoryRouter,
    userInformationRouter,
    ratingRouter,
    googleAuthRouter,
    tasksDoneAmountRouter
}

