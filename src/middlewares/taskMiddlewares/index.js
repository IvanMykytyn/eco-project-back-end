const {isLocationValid} = require("./location")
const {isActivityTypeValid} = require("./activityType")
const {isNumericalIndicatorsValid} = require("./numericalIndicators")
const {isPhotosArrayValid} = require("./photos")
const {isUsersTaskDescriptionValid} = require("./usersTaskDescription")
const {isJWTExpired} = require("./userToken")

module.exports = {
    isLocationValid,
    isActivityTypeValid,
    isNumericalIndicatorsValid,
    isPhotosArrayValid,
    isUsersTaskDescriptionValid,
    isJWTExpired
}