const {sendResponse} = require("../../helpers/sendResponse");

module.exports = {
    pageQuery(req, res, next) {
        try {
            const {page, amount} = req.query;
            if (!page) {
                next()
            } else if (!Number.isInteger(Number(page)) || Number(page) <= 0) {
                throw new Error("bad pages query")
            } else if (page && amount === "all") {
                throw new Error("amount should be an integer when you pass a page")
            } else {
                next()
            }
        } catch (e) {
            sendResponse(res, 500, e.message)
        }


    }
}