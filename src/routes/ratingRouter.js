const {Router} = require("express");
const {ratingController} = require("../controllers");
const {isJWTInHeadersExpired} = require("../middlewares/taskHistoryMiddlewares")

let ratingRouter = Router();

ratingRouter.get("/", isJWTInHeadersExpired, ratingController);

module.exports = ratingRouter;
