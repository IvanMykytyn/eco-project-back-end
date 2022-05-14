const User = require("../../models/user");
const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    async isUserAlreadyExist(req, res, next) {
        try
        {
            const email = req.body.email.toLowerCase();

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({email});
            if (oldUser) {
                sendResponse(res, 409, "User Already Exist. Please Login")
            } else {
                next()
            }
        }catch (e) {
            sendResponse(res, 500, e.message)
        }

    }
}