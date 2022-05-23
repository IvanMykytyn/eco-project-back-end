const {Router} = require("express");

const {loginController} = require("../controllers/loginController");

let loginRouter = Router();

loginRouter.post("/", loginController);

module.exports = loginRouter;
