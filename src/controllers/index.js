const {GoogleAuthRedirect, GoogleAuthController} = require("./GoogleAuthController")
const {notFoundErrorController} = require("./notFoundErrorController")
const {registerController} = require("./registerController")
const {loginController} = require("./loginController")
const {activitiesController} = require("./activitiesController")
const {tasksController} = require("./tasksController")
const {userInformationController} = require("./userInformationController")
const {ratingController} = require("./ratingController");
const {tasksDoneAmountController} = require("./tasksDoneAmountController")

module.exports =
    {
        GoogleAuthRedirect,
        GoogleAuthController,
        notFoundErrorController,
        registerController,
        loginController,
        activitiesController,
        tasksController,
        userInformationController,
        ratingController,
        tasksDoneAmountController
    }
