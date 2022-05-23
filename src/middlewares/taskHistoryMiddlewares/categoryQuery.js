const {activityTypeEnum} = require("../../helpers/constants/constants")
const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    categoryQuery(req, res, next) {
        try {
            const {category} = req.query
            if (category !== "any" && !activityTypeEnum.includes(category)) {
                throw new Error("category query should be one of ('any', 'Garbage sorting', 'Paper waste sale'," +
                    " 'Resource saving tech', 'Plant a piece of flora', 'Clean a patch of land')")
            }
            next()
        } catch (e) {
            sendResponse(res, 400, e.message)
        }

    }
}