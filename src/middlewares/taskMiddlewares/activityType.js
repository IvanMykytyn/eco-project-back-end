const {activityTypeEnum} = require("../../helpers/constants/constants")
const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    isActivityTypeValid(req, res, next) {
        try {
            const {activity_type} = req.body
            if (typeof activity_type != "string") {
                throw new Error(`\"activity_type\" should be a string, your type ${typeof activity_type}`)
            }
            if (!activityTypeEnum.includes(activity_type)) {
                throw new Error("incorrect \"activity_type\"")
            }
            next()

        } catch (e) {
            sendResponse(res, 400, e.message)
        }
    }
}