let passwordValidator = require('password-validator');
const {sendResponse} = require("../../helpers/sendResponse");
let lastNameSchema = new passwordValidator();

lastNameSchema
    .is().min(1, "last name must have at least 1 character")
    .is().max(25, "last name must be no more than 25 characters")
    .has().not().digits(0, "last name should not include digits")
    .has().not().spaces(0, "last name should not include spaces")
    .has().not().symbols(0, "last name should not include special symbols")


module.exports = {
    lastNameValidity(req, res, next) {
        try {
            let isValid = lastNameSchema.validate(req.body.last_name) // true or false

            if (typeof (req.body.last_name) !== "string") {
                sendResponse(res, 400, "last name must be a string")
            } else if (!isValid){
                // array of objects {details: true}
                let validationData = lastNameSchema.validate(req.body.last_name, {details: true})
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