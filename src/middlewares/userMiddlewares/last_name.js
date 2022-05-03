let passwordValidator = require('password-validator');
let lastNameSchema = new passwordValidator();

lastNameSchema
    .is().min(1, "last name must have at least 1 character")
    .is().max(25, "last name must be no more than 25 characters")
    .has().not().digits(0, "last name should not include digits")
    .has().not().spaces(0, "last name should not include spaces")


module.exports = {
    lastNameValidity(req, res, next) {
        try {
            let isValid = lastNameSchema.validate(req.body.last_name) // true or false

            if (typeof (req.body.last_name) !== "string") {
                res.statusCode = 400
                res.send("last name must be a string")
                res.end()

            } else if (!isValid) {
                res.statusCode = 400
                // array of objects {details: true}
                let validationData = lastNameSchema.validate(req.body.last_name, {details: true})
                // filter it
                let responseData = validationData.map((item) => {
                    return item.message
                })
                res.send(responseData)
                res.end()
            } else {
                next()
            }
        } catch (e) {
            res.status(500).send(e.message)
            res.end()
        }

    }

}