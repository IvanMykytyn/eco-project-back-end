const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    isUsersTaskDescriptionValid(req, res, next) {
        try {
            const {users_task_description} = req.body
            if (typeof users_task_description != "string") {
                throw new Error("\"users_task_description\" should be a string")
            }
            if (users_task_description.length > 300) {
                throw new Error("\"users_task_description\" must be no more than 300 characters")
            }
            if (users_task_description.trim().length === 0) {
                throw new Error("\"users_task_description\" is required")
            }
            next()
        } catch (e) {
            sendResponse(res, 400, e.message)
        }
    }
}