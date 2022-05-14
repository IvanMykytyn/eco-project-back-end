const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    isUsersTaskDescriptionValid(req, res, next) {
        try {
            const {users_task_description} = req.body
            if (typeof users_task_description != "string") {
                throw new Error("\"users_task_description\" should be a string")
            }
            if (users_task_description.length > 500) {
                throw new Error("\"users_task_description\" must be no more than 500 characters")
            }
            next()
        } catch (e) {
            sendResponse(res, 400, e.message)
        }
    }
}