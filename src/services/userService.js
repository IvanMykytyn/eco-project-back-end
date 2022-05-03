const User = require("../models/user");

module.exports = {
    async createUser(first_name, last_name, date_of_birth, email, encryptedPassword) {
        const user = await User.create({
            first_name,
            last_name,
            date_of_birth,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        return user
    }
}