const jwt = require("jsonwebtoken");
const {sendResponse} = require("../../helpers/sendResponse")

module.exports = {
    isJWTExpired(req,res,next){
        try{
            const {token} = req.body

            const decoded = jwt.verify(token, process.env.TOKEN_KEY)
            const {userId} = decoded
            req.body.userId = userId
            next()
        }catch (e) {
            sendResponse(res, 401, e.message)
        }

    }
}