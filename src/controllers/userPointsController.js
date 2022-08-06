const {sendResponse} = require("../helpers/sendResponse");
const {getUserPoints} = require("../services/userService")

module.exports = {
    async userPointsController(req, res) {
        try {
            const points = await getUserPoints(res.locals.userId)
            res.status(200).send(points)
        } catch (e) {
            sendResponse(res, 500, e.message)
        }


    }
}