const {Router} = require("express")
const {
    isActivityTypeValid,
    isLocationValid,
    isNumericalIndicatorsValid,
    isPhotosArrayValid,
    isUsersTaskDescriptionValid,
    isJWTExpired
} = require("../middlewares/taskMiddlewares")

const {tasksController} = require("../controllers");

let taskRouter = Router();

taskRouter.post("/", isActivityTypeValid, isLocationValid, isNumericalIndicatorsValid,
    isPhotosArrayValid, isUsersTaskDescriptionValid, isJWTExpired, tasksController)

module.exports = taskRouter