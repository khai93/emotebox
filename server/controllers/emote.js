const { json } = require("body-parser");
const { EmoteService } = require("../services/");
const S3Controller = require("./s3");

const EmoteController = {}

EmoteController.getAllByName = (name) => {
    if (name === '') {
        throw new Error("Emote name cannot be null");
    }
    return EmoteService.getAllByName(name);
}

EmoteController.getById = (id) => {
    if (!id) {
        throw new Error("Emote Id cannot be null");
    }
    return EmoteService.getById(id);
}

EmoteController.searchByText = (query) => {
    if (typeof query == 'undefined') {
        throw new Error("Query must be supplied in order to search");
    }

    const limit = query.limit || 25;
    const startAt = query.startAt || 0;
    const searchTerm = query.searchTerm;

    if (typeof searchTerm == 'undefined' || searchTerm === '') {
        throw new Error("A search term must be supplied in order to search");
    }

    return EmoteService.searchByText(searchTerm, startAt, limit);
}

EmoteController.create = async (user, name, imageFile, tagsParam) => {
    if (typeof name == 'undefined' || !name) {
        throw new Error("Emote name cannot be null");
    }

    if (typeof imageFile == 'undefined' || !imageFile) {
        throw new Error("An image file must be supplied");
    }

    if (!imageFile.hasOwnProperty("path")) {
        throw new Error("Something unexpected happened while retrieving file path");
    }

    const imagePath = imageFile.path

    if (!tagsParam || Object.keys(tagsParam).length === 0) {
        throw new Error("Tags must be supplied in order to create");
    }

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

        return EmoteService.create(name, upload.Location.split("emotes/")[1], tags || [], user.id);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = EmoteController;