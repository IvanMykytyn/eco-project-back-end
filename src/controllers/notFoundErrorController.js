module.exports = {
    async notFoundErrorController(req, res) {
        res.status(404).send("<h1>404! Not found</h1>")
        res.end();
    }
}