const {Router} = require("express")
const {
    emailValidity, passwordValidity, firstNameValidity,
    isInputDataExist, isUserAlreadyExist, lastNameValidity, dateValidity,
    parseUserToJSON
} = require("../middlewares/userMiddlewares")

const {registerController} = require("../controllers/registerController")

let registerRouter = Router()

registerRouter.post("/", passwordValidity, emailValidity, firstNameValidity,
    lastNameValidity, isInputDataExist, isUserAlreadyExist, dateValidity,
    registerController)

module.exports = registerRouter