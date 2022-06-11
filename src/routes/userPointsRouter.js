const {Router} = require("express")
const {userPointsController} = require("../controllers")
const {isJWTInHeadersExpired} = require("../middlewares/taskHistoryMiddlewares");

let userPointsRouter = Router()

userPointsRouter.get("/", isJWTInHeadersExpired, userPointsController);

module.exports = userPointsRouter;