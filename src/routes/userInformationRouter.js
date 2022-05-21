const {Router} = require("express")

const {
    isInputDataExist,
    isDateOutsideTheCurrentDate,
    dateFormatValidity,
    lastNameValidity,
    firstNameValidity,
    passwordValidity,
    emailValidity
} = require("../middlewares/userMiddlewares")

const {isJWTExpired} = require("../middlewares/taskMiddlewares")
const {userInformationController} = require("../controllers");

let userInformationRouter = Router()

userInformationRouter.patch("/", isInputDataExist,
    isDateOutsideTheCurrentDate, dateFormatValidity,
    lastNameValidity,
    firstNameValidity,
    passwordValidity, emailValidity, isJWTExpired,
    userInformationController)

module.exports = userInformationRouter