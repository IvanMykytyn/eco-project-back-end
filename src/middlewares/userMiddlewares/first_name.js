let passwordValidator = require('password-validator');
const {sendResponse} = require("../../helpers/sendResponse");
let firstNameSchema = new passwordValidator();

firstNameSchema
    .is().min(1, "first name must have at least 1 character")
    .is().max(25, "first name must be no more than 25 characters")
    .has().not().digits(0, "first name should not include digits")
    .has().not().spaces(0, "first name should not include spaces")
    .has().not().symbols(0, "first name should not include special symbols")


module.exports = {
    firstNameValidity(req, res, next) {
        try {
            let isValid = firstNameSchema.validate(req.body.first_name) // true or false

            if (typeof (req.body.first_name) !== "string") {
                sendResponse(res, 400, "first name must be a string")
            } else if (!isValid) {
                // array of objects {details: true}
                let validationData = firstNameSchema.validate(req.body.first_name, {details: true})
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