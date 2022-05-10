const {Router} = require("express")
const {
    emailValidity, passwordValidity, firstNameValidity,
    isInputDataExist, isUserAlreadyExist, lastNameValidity, dateFormatValidity,
    isDateOutsideTheCurrentDate
} = require("../middlewares/userMiddlewares")

const {registerController} = require("../controllers/registerController")

let registerRouter = Router()

registerRouter.post("/", passwordValidity, emailValidity, firstNameValidity,
    lastNameValidity, isInputDataExist, isUserAlreadyExist, dateFormatValidity,
    isDateOutsideTheCurrentDate,
    registerController)

module.exports = registerRouter