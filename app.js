require("dotenv").config();
require("./src/configs/database").connect();
const cors = require("cors");
const express = require("express");
const app = express();

const {
  getGoogleAuthURL,
  getGoogleUser,
} = require("./src/controllers/GoogleAuthController");

const { registerRouter, loginRouter } = require("./src/routes");

const {
  createUserByGoogle,
  findUserByEmail,
} = require("./src/services/userService");

const jwt = require("jsonwebtoken");

//
const {
  notFoundErrorController,
} = require("./src/controllers/notFoundErrorController");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/auth/google", (req, res) => {
  try {
    return res.status(200).json({ redirectUrl: getGoogleAuthURL() });
  } catch (error) {
    console.log(error);
  }
});

app.get("/profile", async (req, res) => {
  const data = await getGoogleUser(req.query);
  const { id, email, given_name, family_name } = data;

  var user = await findUserByEmail(email);
  if (!user) {
    user = await createUserByGoogle(given_name, family_name, email);
  }
  // Create token
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
    expiresIn: "1d",
  });

  // save user token
  user.token = token;

  // https://eco-ntinuum.herokuapp.com/profile
  res.redirect("http://localhost:3001/profile", 200, user);
});

app.all("*", notFoundErrorController);

module.exports = app;
