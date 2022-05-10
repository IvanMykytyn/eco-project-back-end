module.exports = {
    isInputDataExist(req, res, next) {
        try {
            // Get user input
            const {first_name, last_name, date_of_birth, email, password} = req.body;

            // Validate user input
            if (!(email && password && first_name && last_name && date_of_birth)) {
                res.status(400).send({message: "All input is required"});
                res.end()
            } else {
                next()
            }
        } catch (e) {
            res.status(500).send({message: e.message})
            res.end()
        }

    }
}