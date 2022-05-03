let validateDate = require("validate-date");

module.exports = {
    dateValidity(req,res,next){
        try{
            const {date_of_birth} = req.body

            const isValid = validateDate(date_of_birth,
                responseType = "boolean",
                dateFormat="yyyy-mm-dd")
            if(!isValid)
            {
                res.status(400).send("bad date format")
                res.end()
            }else
            {
                next()
            }
        }catch (e) {
            res.status(400).send("bad date format")
            res.end()
        }

    }
}