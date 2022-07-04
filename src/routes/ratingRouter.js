const {Router} = require("express");
const {ratingController} = require("../controllers");

let ratingRouter = Router();

ratingRouter.get("/", ratingController);

module.exports = ratingRouter;
