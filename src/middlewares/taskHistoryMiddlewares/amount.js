const {sendResponse} = require("../../helpers/sendResponse");


module.exports = {
    amountValidity(req, res, next) {
        try {
            const {amount} = req.query
            if (amount === "all") {
                next()
            } else if (!Number.isInteger(Number(amount)) || Number(amount) <= 0) {
                throw new Error("bad amount query")
            } else {
                next()
            }
        } catch (e) {
            sendResponse(res, 400, e.message)
        }
    }

}