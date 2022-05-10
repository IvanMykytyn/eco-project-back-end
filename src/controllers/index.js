const {GoogleAuthRedirect, GoogleAuthController} = require("./GoogleAuthController")
const {notFoundErrorController} = require("./notFoundErrorController")
const {registerController} = require("./registerController")
const {loginController} = require("./loginController")
const {activitiesController} = require("./activitiesController")

module.exports =
    {
        GoogleAuthRedirect,
        GoogleAuthController,
        notFoundErrorController,
        registerController,
        loginController,
        activitiesController
    }