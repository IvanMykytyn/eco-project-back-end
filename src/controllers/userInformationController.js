const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {updateUserInformation} = require("../services/userService");
const {sendResponse} = require("../helpers/sendResponse");


module.exports = {
    async userInformationController(req, res) {
        try {
            const {first_name, last_name, email, date_of_birth, password, userId} = req.body
            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await updateUserInformation({
                    first_name,
                    last_name,
                    date_of_birth,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                    userId
                }
            );

            // Create token
            const token = jwt.sign({userId: user._id}, process.env.TOKEN_KEY, {
                expiresIn: "3d",
            });
            user.token = token;

            res.status(200).send(user)
            res.end()
        } catch (e) {
            sendResponse(res, 500, e.message)
        }


    }
}