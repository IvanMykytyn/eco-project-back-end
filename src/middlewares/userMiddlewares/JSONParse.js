module.exports =
    {
        parseUserToJSON(req,res,next)
        {
            try
            {
                req.body =JSON.parse(req.body)
                next()
            }catch (e) {
                res.status(500).send()
                res.end()
            }

        }
    }