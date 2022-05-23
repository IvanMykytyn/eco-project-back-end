const {sendResponse} = require("../helpers/sendResponse");

module.exports = {
    async notFoundErrorController(req, res) {
        try {
            res.status(404).send("<h1>404! Not found</h1>")
            res.end();
        } catch (e) {
            sendResponse(res, 500, e.message)
        }

    }
}