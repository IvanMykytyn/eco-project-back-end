const User = require("../../models/user");

module.exports = {
    async isUserAlreadyExist(req, res, next) {
        try
        {
            const email = req.body.email.toLowerCase();

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({email});
            if (oldUser) {
                res.status(409).send("User Already Exist. Please Login");
                res.end()
            } else {
                next()
            }
        }catch (e) {
            res.status(500).send(e.message)
            res.end()
        }

    }
}