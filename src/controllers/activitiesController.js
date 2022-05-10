const activity = require("../models/activity")
const {setIconToResponseObjects} = require("../helpers/getIcon")

module.exports = {
    async activitiesController(req, res, next) {
        const activities = await activity.find({})
        const activities_to_response = setIconToResponseObjects(activities)
        res.send(activities_to_response)
        res.end()
    }
}