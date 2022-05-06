let passwordValidator = require('password-validator');
let firstNameSchema = new passwordValidator();

firstNameSchema
    .is().min(1, "first name must have at least 1 character")
    .is().max(25, "first name must be no more than 25 characters")
    .has().not().digits(0, "first name should not include digits")
    .has().not().spaces(0, "first name should not include spaces")


module.exports = {
    firstNameValidity(req, res, next) {
        try
        {
            let isValid = firstNameSchema.validate(req.body.first_name) // true or false

            if (typeof (req.body.first_name) !== "string") {
                res.statusCode = 400
                res.send({message: "first name must be a string"})
                res.end()
            } else if (!isValid) {
                res.statusCode = 400
                // array of objects {details: true}
                let validationData = firstNameSchema.validate(req.body.first_name, {details: true})
                // filter it
                let responseData = validationData.map((item) => {
                    return item.message
                })
                res.send({message: responseData[0]})
                res.end()
            } else {
                next()
            }
        }catch (e) {
            res.status(500).send({message: e.message})
            res.end()
        }

    }

}