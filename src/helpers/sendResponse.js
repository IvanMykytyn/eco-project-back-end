module.exports = {
    sendResponse(response, statusCode, message){
        response.status(statusCode).send({message: message})
        response.end()
    }
}