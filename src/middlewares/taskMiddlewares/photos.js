const {sendResponse} = require("../../helpers/sendResponse");
module.exports = {
    isPhotosArrayValid(req,res,next)
    {
        try {
            const {photos} = req.body
            if(!Array.isArray(photos)){
                throw new Error("\"photos\" should be an Array")
            }
            if(photos.length > 3){
                throw new Error("\"photos\" must be no more than 3 length")
            }
            // for(let i = 0;i<photos.length;i++){
            //     if(photos[i].type !== "Buffer"){
            //         throw new Error("each \"photos\" element must be of type buffer")
            //     }
            // }

            next()
        }catch (e) {
            sendResponse(res, 400, e.message)
        }

    }
}