const {Router} = require("express");

const {googleAuthController} = require("../controllers/GoogleAuthController");

let googleAuthRouter = Router();

googleAuthRouter.post("/", googleAuthController);

module.exports = googleAuthRouter;
