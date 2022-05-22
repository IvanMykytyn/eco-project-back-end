const taskSchema = require("../models/task")

module.exports = {
    async setTask(task) {
        return await taskSchema.create(task)
    },
    async getUserTasks(userId, status, category, amount) {
        if (status === "any" && category === "any" && amount === "all") {
            return taskSchema.find({user_id: userId})
        } else if (status !== "any" && category === "any" && amount === "all") {
            return taskSchema.find({user_id: userId, status})
        } else if (status !== "any" && category !== "any" && amount === "all") {
            return taskSchema.find({user_id: userId, status, activity_type: category})
        } else if (status !== "any" && category !== "any" && amount !== "all") {
            return taskSchema.find({user_id: userId, status, activity_type: category}).limit(parseInt(amount))
        } else if (status === "any" && category !== "any" && amount === "all") {
            return taskSchema.find({user_id: userId, activity_type: category})
        } else if (status === "any" && category !== "any" && amount !== "all") {
            return taskSchema.find({user_id: userId, activity_type: category}).limit(parseInt(amount))
        } else if (status === "any" && category === "any" && amount !== "all") {
            return taskSchema.find({user_id: userId}).limit(parseInt(amount))
        } else {
            throw new Error("can't get")
        }
    }
}