const { Router } = require("express");
const {activitiesController}= require("../controllers")

let activitiesRouter = Router();

activitiesRouter.get("/", activitiesController)

module.exports = activitiesRouter