const {emailValidity} = require("./email")
const {passwordValidity} = require("./password")
const {isInputDataExist} = require("./validateInputData")
const {isUserAlreadyExist} = require("./isUserAlreadyExist")
const {lastNameValidity} = require("./last_name")
const {firstNameValidity} = require("./first_name")
const {dateValidity} = require("./date")

module.exports = {
    emailValidity,
    passwordValidity,
    isInputDataExist,
    isUserAlreadyExist,
    lastNameValidity,
    firstNameValidity,
    dateValidity
}