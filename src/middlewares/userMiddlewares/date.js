let validateDate = require("validate-date");

module.exports = {
    dateFormatValidity(req,res,next){
        try{
            const {date_of_birth} = req.body

            const isValid = validateDate(date_of_birth,
                responseType = "boolean",
                dateFormat="yyyy-mm-dd")
            if(!isValid)
            {
                res.status(400).send({message: "bad date format"})
                res.end()
            }else
            {
                next()
            }
        }catch (e) {
            res.status(400).send({message: "bad date format"})
            res.end()
        }

    },
    isDateOutsideTheCurrentDate(req, res, next)
    {
        const {date_of_birth} = req.body
        const year = date_of_birth.substring(0,4);

        const currentTime = new Date()
        const current_year =  currentTime.getFullYear()

        if(parseInt(year) > current_year || parseInt(year) <= 1940){
            res.status(400).send({message: "wrong year of birth"})
            res.end()
          }else{
            next()
        }
    }
}