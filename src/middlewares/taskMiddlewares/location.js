const {sendResponse} = require("../../helpers/sendResponse");
module.exports = {
    isLocationValid(req,res,next){
        try {
            const {location} = req.body
            if (typeof location != "string") {
                throw new Error("\"location\" should be a string")
            }
            next()
        }catch (e) {
            sendResponse(res, 400, e.message)
        }
    }
}