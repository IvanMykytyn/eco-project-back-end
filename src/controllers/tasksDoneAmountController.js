const {getNumberOfUsersTasks} = require("../services/taskService");

module.exports = {
    async tasksDoneAmountController(req, res) {
        const totalTasks = await getNumberOfUsersTasks(res.locals.userId, "any", "any");
        const number_of_tasks = totalTasks.length

        res.status(200).send({tasksDone: number_of_tasks})
        res.end()
    }
}