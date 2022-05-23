const mongoose = require("mongoose");
const {activityTypeEnum} = require("../helpers/constants/constants");

const activitySchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    path_to_icon: {type: String},
    type: {type: String, enum : activityTypeEnum},
    number_of_points: {type: Number},
    unit_of_measure: {type: String},
});

module.exports = mongoose.model("activity", activitySchema, "activities");