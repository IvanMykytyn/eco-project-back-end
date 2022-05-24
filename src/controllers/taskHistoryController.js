const {getUserTasks, getNumberOfUsersTasks} = require("../services/taskService");
const activity = require("../models/activity")

module.exports = {
    async taskHistoryController(req, res) {
        const {status, category, amount, page} = req.query
        const tasks = await getUserTasks(res.locals.userId, status, category, amount, page)
        const totalTasks = await getNumberOfUsersTasks(res.locals.userId, status, category)
        const number_of_tasks = totalTasks.length
        const activities = await activity.find({})

        // add points to tasks
        const tasksToResponse = tasks.map((it) => {
            const activity = activities.find((activity) => {
                return activity.type === it.activity_type
            })
            const points = activity.number_of_points * it.numerical_indicators
            const {_id} = it
            return {
                _id,
                activity_type: it.activity_type,
                status: it.status,
                users_task_description: it.users_task_description,
                numerical_indicators: it.numerical_indicators,
                points,
                admin_message: it.admin_message,
                location: it.location,
                photos: it.photos
            }
        })
        res.setHeader("tasksTotalNumber", number_of_tasks)
        res.status(200).send(tasksToResponse)
        res.end()
    }
}