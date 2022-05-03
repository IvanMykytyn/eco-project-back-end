let validator = require("email-validator");

module.exports = {
    emailValidity(req,res,next){
        try
        {
         let {email} = req.body;
         let isValid = validator.validate(email);
         if(!isValid) {
             res.status(400).send("bad email")
             res.end()
         }else{
             next()
         }
        }catch (e)
        {
            res.status(500).send(e.message)
            res.end()
        }
    }
}