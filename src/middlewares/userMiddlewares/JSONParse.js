module.exports =
    {
        parseUserToJSON(req,res,next)
        {
            try
            {
                res.send(req.body)
                res.end()
                //next()
            }catch (e) {
                res.status(500).send(e.message)
                res.end()
            }

        }
    }