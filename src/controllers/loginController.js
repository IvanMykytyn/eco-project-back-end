const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../services/userService");

module.exports = {
  async loginController(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Find user by email in our database
      const user = await findUserByEmail(email);

      // TODO something if no such an user
      if (!user) {
        return res.status(401).send({ password: "Invalid password or email"});
      }

      // check if correct password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).send({ password: "Invalid password or email" });
      }

      // Create token
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "1d",
      });

      user.token = token;



      // return user and token
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({message: e.message});
      res.end();
    }
  },
};
