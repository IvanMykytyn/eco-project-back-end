const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    date_of_birth: {type: Date, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    points: {type: Number, default: 0},
    token: {type: String},
});

userSchema.methods.toJSON = function () {
    let user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("user", userSchema, "users");
