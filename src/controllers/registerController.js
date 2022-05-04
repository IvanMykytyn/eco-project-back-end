const bcrypt = require("bcryptjs");
const { createUser } = require("../services/userService");
const jwt = require("jsonwebtoken");

module.exports = {
  async registerController(req, res) {
    try {
      // Get user input
      const { first_name, last_name, date_of_birth, email, password } =
        req.body;
      console.log(first_name, last_name, date_of_birth, email, password);
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await createUser(
        first_name,
        last_name,
        date_of_birth,
        email,
        encryptedPassword
      );

      // Create token
      const token = jwt.sign(
        { email, first_name, last_name, date_of_birth },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1d",
        }
      );
      // save user token
      user.token = token;

      // return new user
      return res.status(201).json(user);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
      res.end();
    }
  },
};
