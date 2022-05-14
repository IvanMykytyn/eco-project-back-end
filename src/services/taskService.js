const taskSchema = require("../models/task")

module.exports = {
    async setTask(task){
        return await taskSchema.create(task)
    }
}