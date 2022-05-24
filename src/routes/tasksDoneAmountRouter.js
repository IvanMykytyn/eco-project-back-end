const {Router} = require("express")
const {isJWTInHeadersExpired} = require("../middlewares/taskHistoryMiddlewares");
const {tasksDoneAmountController} = require("../controllers")

let tasksDoneAmountRouter = Router();

tasksDoneAmountRouter.get("/", isJWTInHeadersExpired, tasksDoneAmountController);

module.exports = tasksDoneAmountRouter;