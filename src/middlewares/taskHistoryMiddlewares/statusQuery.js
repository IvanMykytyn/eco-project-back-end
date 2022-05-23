const {statusEnum} = require("../../helpers/constants/constants")
const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    statusQuery(req,res, next){
        const {status} = req.query
        try{
            if(status !== "any" && !statusEnum.includes(status)){
                throw new Error("status query should be one of ('any', 'pending', 'testing','rejected', 'accepted')")
            }
            next()
        }catch (e) {
            sendResponse(res, 400, e.message)
        }

    }
}