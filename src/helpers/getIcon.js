const fs = require("fs");
const path = require("path");

module.exports = {
    setIconToResponseObjects(activities) {
        return activities.map((item, index, array) => {
            return {
                ...item.toJSON(),
                icon: fs.readFileSync(path.join(process.cwd(), "src", "static", "activitiesIcons", item.path_to_icon))
            }
        })
    }
}