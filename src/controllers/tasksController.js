const {statusEnum} = require("../helpers/constants/constants")
const {setTask} = require("../services/taskService");
const {sendResponse} = require("../helpers/sendResponse");
const {addPointsToTheUser} = require("../services/userService");

module.exports = {
    async tasksController(req, res) {
        try {

            const {activity_type, users_task_description, numerical_indicators, location, photos, userId} = req.body

            const task = {
                user_id: userId,
                activity_type,
                status: statusEnum[3],
                users_task_description,
                numerical_indicators,
                admin_message: '',
                location,
                photos
            }

            const task_to_response = await setTask(task)
            const user_points = await addPointsToTheUser(task.numerical_indicators, task.activity_type, task.user_id)
            res.status(201).send({task: task_to_response, user_points})
            res.end()
        } catch (e) {
            sendResponse(res, 500, e.message)
        }
    }
}