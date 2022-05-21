const mongoose = require("mongoose");

const {activityTypeEnum, statusEnum} = require("../helpers/constants/constants");

const taskSchema = new mongoose.Schema({
     user_id: {type: mongoose.Types.ObjectId, required: true},
     activity_type: {type: String, enum : activityTypeEnum, required: true},
     status: {type: String, enum: statusEnum, required: true},
     users_task_description: {type: String, required: true},
     numerical_indicators: {type: Number, required: true},
     admin_message: {type: String},
     location: {type: String},
     photos: {type: [Buffer], required: true}
});

taskSchema.methods.toJSON = function() {
     let task = this.toObject()
     delete task.user_id
     delete task._id
     delete task.__v
     return task
}

module.exports = mongoose.model("task", taskSchema, "tasks");
