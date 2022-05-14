const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    isInputDataExist(req, res, next) {
        try {
            // Get user input
            const {first_name, last_name, date_of_birth, email, password} = req.body;

            // Validate user input
            if (!(email && password && first_name && last_name && date_of_birth)) {
                sendResponse(res, 400, "All input is required")
            } else {
                next()
            }
        } catch (e) {
            sendResponse(res, 500, e.message)
        }

    }
}