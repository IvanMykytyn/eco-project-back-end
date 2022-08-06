const {
    createUserByGoogle,
    findUserByEmail,
} = require("../services/userService");

const jwt = require("jsonwebtoken");

const {OAuth2Client} = require("google-auth-library");
const {sendResponse} = require("../helpers/sendResponse");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    async googleAuthController(req, res) {
        try{
            const {token} = req.body;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const {given_name, family_name, email} = ticket.getPayload();

            var user = await findUserByEmail(email);
            if (!user) {
                user = await createUserByGoogle(given_name, family_name, email);
            }

            const jwt_token = jwt.sign({userId: user._id}, process.env.TOKEN_KEY, {
                expiresIn: "3d",
            });

            user.token = jwt_token;

            res.status(201);
            res.json(user);
        }catch (e) {
            sendResponse(res, 500, e.message)
        }

    },
};
