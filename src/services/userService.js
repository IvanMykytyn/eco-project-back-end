const User = require("../models/user");

module.exports = {
  async createUser(
    first_name,
    last_name,
    date_of_birth,
    email,
    encryptedPassword
  ) {
    const user = await User.create({
      first_name,
      last_name,
      date_of_birth,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    return user;
  },
  async createUserByGoogle(first_name, last_name, email) {
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
    });

    return user;
  },
  async findUserByEmail(inputEmail) {
    const email = inputEmail.toLowerCase();
    const user = await User.findOne({ email });

    return user;
  },
};
