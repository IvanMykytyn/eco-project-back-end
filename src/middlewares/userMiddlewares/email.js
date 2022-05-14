let validator = require("email-validator");
const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    emailValidity(req,res,next){
        try
        {
         let {email} = req.body;
         let isValid = validator.validate(email);
         if(!isValid) {
             sendResponse(res, 400, "bad email")
         }else{
             next()
         }
        }catch (e)
        {
            sendResponse(res, 500, e.message)
        }
    }
}