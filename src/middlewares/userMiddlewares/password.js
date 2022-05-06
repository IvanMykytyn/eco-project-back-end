// length 8-25 characters, min 1 upperCase character, min 1 lowercase character, withoutSpaces
//min 1 digit
let passwordValidator = require('password-validator');
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
                res.statusCode = 400
                res.send({message: "password must be a string"})
                res.end()
            } else if (!isValid) {
                res.statusCode = 400
                // array of objects {details: true}
                let validationData = passwordSchema.validate(req.body.password, {details: true})
                // filter it
                let responseData = validationData.map((item) => {
                    return item.message
                })
                res.send({message: responseData[0]})
                res.end()
            } else {
                next()
            }
        } catch (e) {
            res.status(500).send({message: e.message})
            res.end()
        }
    }

}