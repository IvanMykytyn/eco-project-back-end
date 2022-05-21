const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    isNumericalIndicatorsValid(req, res, next) {
        try {
            const {numerical_indicators} = req.body
            if (typeof numerical_indicators != "number" || !Number.isInteger(numerical_indicators)) {
                throw  new Error("\"numerical_indicators\" should be an integer")
            }if(numerical_indicators <= 0){
                throw  new Error("\"numerical_indicators\" should be > 0")
            }
            next()
        } catch (e) {
            sendResponse(res, 400, e.message)
        }
    }
}