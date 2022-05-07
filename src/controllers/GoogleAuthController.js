const {
  createUserByGoogle,
  findUserByEmail,
} = require("../services/userService");
const axios = require("axios");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

// CLIENT_ID - CLIENT_SECRET - REDIRECT_URL
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/profile"
);

function getGoogleAuthURL() {
  /* Generate a url that asks permissions to the user's email and profile */
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
}
async function getGoogleUser({ code }) {
  const { tokens } = await oauth2Client.getToken(code);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return googleUser;
}

module.exports = {
  async GoogleAuthRedirect(req, res) {
    res.redirect(getGoogleAuthURL());
  },
  async GoogleAuthController(req, res) {
    const data = await getGoogleUser(req.query);
    const { id, email, given_name, family_name } = data;

    const isEmailAlreadySigned = await findUserByEmail(email);

    // TODO something if no such an user
    if (isEmailAlreadySigned) {
      return res.status(401).send({ message: "This email has already exist" });
    }

    const user = await createUserByGoogle(given_name, family_name, email);

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    });
    // save user token
    user.token = token;

    res.status(200).json(user);
  },
};
