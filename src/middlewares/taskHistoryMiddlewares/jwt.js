const jwt = require("jsonwebtoken");
const {sendResponse} = require("../../helpers/sendResponse");
module.exports = {
    isJWTInHeadersExpired(req,res,next){
        try{
            const {authorization: token} = req.headers

            const decoded = jwt.verify(token, process.env.TOKEN_KEY)
            const {userId} = decoded
            res.locals.userId = userId
            next()
        }catch (e) {
            sendResponse(res, 401, e.message)
        }
    }
}