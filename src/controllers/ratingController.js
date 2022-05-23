const task = require("../models/task");
const user = require("../models/user");
const activity = require("../models/activity");

const {sendResponse} = require("../helpers/sendResponse");

function getFavorite(arr) {
    if (arr.length === 1) {
        return arr[0];
    }
    return arr
        .sort(
            (a, b) =>
                arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
        )
        .pop();
}

module.exports = {
    async ratingController(req, res) {
        try {
            const tasks = await task.find({});
            const users = await user.find({});
            const activities = await activity.find({});

            // all users
            users.forEach((currentUser) => {
                // initial state
                currentUser.points = 0;
                currentUser.count_of_tasks = 0;
                var categoryArray = [];

                // check tasks that user did
                tasks.forEach((currentTask) => {
                    if (currentTask.user_id.toString() == currentUser._id.toString()) {
                        // check how many points it cost
                        const taskActivity = activities.find(
                            (currentActivity) =>
                                currentActivity.title == currentTask.activity_type
                        );

                        // add points, count of tasks, and category
                        currentUser.points +=
                            taskActivity.number_of_points * currentTask.numerical_indicators;
                        currentUser.count_of_tasks += 1;
                        categoryArray.push(taskActivity.title);
                    }
                });

                //set user full name
                currentUser.full_name =
                    currentUser.first_name[0].toUpperCase() +
                    ". " +
                    currentUser.last_name[0].toUpperCase() +
                    currentUser.last_name.slice(1).toLowerCase();
                //

                // set user favorite category
                currentUser.favorite = getFavorite(categoryArray)
                    ? getFavorite(categoryArray)
                    : "none";

                //
            });

            const userRating = users.map((user) => {
                return {
                    full_name: user.full_name,
                    points: user.points,
                    count_of_tasks: user.count_of_tasks,
                    favorite: user.favorite,
                };
            });

            res.status(200);
            res.send(userRating);
            res.end();
        } catch (e) {
            sendResponse(res, 500, e.message);
        }
    },
};
