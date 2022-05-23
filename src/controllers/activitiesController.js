const activity = require("../models/activity")
const {setIconToResponseObjects} = require("../helpers/getIcon")
const {deleteIdFromActivities} = require("../helpers/dleteIdFromActivities");
const {sendResponse} = require("../helpers/sendResponse");

module.exports = {
    async activitiesController(req, res) {
        try{
            const activities = await activity.find({})
            const activities_to_response = setIconToResponseObjects(activities)

            deleteIdFromActivities(activities_to_response)

            res.send(activities_to_response)
            res.end()
        }catch (e) {
            sendResponse(res, 500, e.message)
        }

    }
}