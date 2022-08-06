const User = require("../models/user");
const googleUser = require("../models/googleUser");
const activitySchema = require("../models/activity")

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
        const user = await googleUser.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
        });

        return user;
    },
    async findUserByEmail(inputEmail) {
        const email = inputEmail.toLowerCase();
        const user = await User.findOne({email});

        return user;
    },
    async addPointsToTheUser(numericalIndicators, activity_type, user_id) {
        const activity = await activitySchema.findOne({type: activity_type})
        const user = await User.findOne({_id: user_id})
        user.points += (activity.number_of_points * numericalIndicators)
        user.save()
        return user.points
    },

    async updateUserInformation(user) {
        return User.findOneAndUpdate({_id: user.userId}, user, {new: true});
    },

    async getUserPoints(user_id){
        return User.findOne({_id: user_id}, {"points": 1, '_id': false})
    }
};
