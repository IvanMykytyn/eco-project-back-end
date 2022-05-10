const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date },
  email: { type: String, unique: true, required: true },
  points: { type: Number, default: 0 },
  token: { type: String },
});

module.exports = mongoose.model("googleUser", googleUserSchema, "users");
