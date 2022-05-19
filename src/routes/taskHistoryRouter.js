const {Router} = require("express")
const {taskHistoryController} = require("../controllers/taskHistoryController");
const {categoryQuery, statusQuery, amountValidity, isJWTInHeadersExpired} = require("../middlewares/taskHistoryMiddlewares")

let taskHistoryRouter = Router()

taskHistoryRouter.get("/", categoryQuery, statusQuery, amountValidity, isJWTInHeadersExpired,
    taskHistoryController
)

module.exports = taskHistoryRouter