const {statusEnum} = require("../helpers/constants/constants")
const {setTask} = require("../services/taskService");
const {sendResponse} = require("../helpers/sendResponse");

module.exports = {
    async tasksController(req, res) {
        try {
            const {activity_type, users_task_description, numerical_indicators, location, photos, userId} = req.body

            const task = {
                user_id: userId,
                activity_type,
                status: statusEnum[0],
                users_task_description,
                numerical_indicators,
                admin_message: '',
                location,
                photos
            }

            await setTask(task)
            sendResponse(res, 201, "successfully created in DB")
        }catch (e) {
            sendResponse(res, 500, e.message)
        }
    }
}