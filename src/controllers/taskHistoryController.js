const {getUserTasks} = require("../services/taskService");

module.exports = {
   async taskHistoryController(req, res) {
       const {status, category, amount} = req.query
        const tasks = await getUserTasks(res.locals.userId, status, category, amount)
        res.status(200).send(tasks)
        res.end()
    }
}