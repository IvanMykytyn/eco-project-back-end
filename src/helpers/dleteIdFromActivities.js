module.exports = {
    deleteIdFromActivities(activities_to_response){
        for(let i = 0;i<activities_to_response.length;i++){
            delete activities_to_response[i]._id
        }
    }

}