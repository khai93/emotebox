const { json } = require("body-parser");
const { EmoteService } = require("../services/");
const S3Controller = require("./s3");

const EmoteController = {}

EmoteController.getAllByName = (name) => EmoteService.getAllByName(name);

EmoteController.getById = (id) => EmoteService.getById(id);

EmoteController.getByCreatorId = (id) => EmoteService.getByCreatorId(id);

EmoteController.searchByText = (query) => {
    try {
        const limit = parseInt(query.limit) || 25;
        const startAt = parseInt(query.startAt) || 0;
        const searchTerm = query.searchTerm;

        return EmoteService.searchByText(searchTerm, startAt, limit);
    } catch (e) {
        throw new Error(e)
    }
}

EmoteController.create = async (user, name, imageFile, tagsParam) => {
    const imagePath = imageFile.path;
    let tags = tagsParam;

    // POSTMAN MIGHT SEND AS STRING
    if (typeof tagsParam == "string") {
        try {
            tags = JSON.parse(tagsParam);
        } catch (e) {
            throw new Error(e);
        }
    }

    try {
        const upload = await S3Controller.uploadFile(imagePath);

        const split = upload.Location.split("emotes/");

        if (split.length <= 0) {
            throw new Error("Unexpected upload location");
        }

        return EmoteService.create(name, upload.Location.split("emotes/")[1], tags || [],  user.id);
    } catch (e) {
        throw new Error(e);
    }
}


module.exports = EmoteController;