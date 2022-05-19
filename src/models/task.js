const mongoose = require("mongoose");
const { activityTypeEnum } = require("../helpers/constants/constants");

const taskSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, required: true },
    activity_type: { type: String, enum: activityTypeEnum, required: true },
    status: {
      type: String,
      enum: ["pending", "testing", "rejected", "accepted"],
      required: true,
    },
    users_task_description: { type: String, required: true },
    numerical_indicators: { type: Number, required: true },
    admin_message: { type: String },
    location: { type: String, required: true },
    photos: { type: [Buffer], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema, "tasks");
