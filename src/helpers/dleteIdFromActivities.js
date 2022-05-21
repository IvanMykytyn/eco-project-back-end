module.exports = {
    deleteIdFromActivities(activities_to_response){
        for(let i = 0;i<activities_to_response.length;i++){
            activities_to_response[i].icon = activities_to_response[i].icon.toString("base64")
            delete activities_to_response[i]._id
        }
    }

}