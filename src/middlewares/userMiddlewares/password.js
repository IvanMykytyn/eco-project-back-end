// length 8-25 characters, min 1 upperCase character, min 1 lowercase character, withoutSpaces
//min 1 digit
let passwordValidator = require('password-validator');
const {sendResponse} = require("../../helpers/sendResponse");
let passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8, "password must have at least 8 characters")
    .is().max(25, "password must be no more than 25 characters")
    .has().uppercase(1, "password must have at least 1 uppercase character")
    .has().lowercase(1, "password must have at least 1 lowercase character")
    .has().digits(1, "password must have at least 1 digit")
    .has().not().spaces(0, "password should not include spaces")

module.exports = {
    passwordValidity(req, res, next) {
        try {
            let isValid = passwordSchema.validate(req.body.password) // true or false

            if (typeof (req.body.password) !== "string") {
                sendResponse(res, 400, "password must be a string")
            } else if (!isValid) {
                // array of objects {details: true}
                let validationData = passwordSchema.validate(req.body.password, {details: true})
                // filter it
                let responseData = validationData.map((item) => {
                    return item.message
                })
                sendResponse(res, 400, responseData[0])
            } else {
                next()
            }
        } catch (e) {
            sendResponse(res, 500, e.message)
        }
    }

}