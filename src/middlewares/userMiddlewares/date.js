let validateDate = require("validate-date");
const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    dateFormatValidity(req, res, next) {
        try {
            const {date_of_birth} = req.body

            const isValid = validateDate(date_of_birth,
                responseType = "boolean",
                dateFormat = "yyyy-mm-dd")
            if (!isValid) {
                sendResponse(res, 400, "bad date format")
            } else {
                next()
            }
        } catch (e) {
            sendResponse(res, 400, "bad date format")
        }

    },
    isDateOutsideTheCurrentDate(req, res, next) {
        const {date_of_birth} = req.body
        const year = date_of_birth.substring(0, 4);

        const currentTime = new Date()
        const current_year = currentTime.getFullYear()

        if (parseInt(year) > current_year || parseInt(year) <= 1940) {
            sendResponse(res, 400, "wrong year of birth")
        } else {
            next()
        }
    }
}