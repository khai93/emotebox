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

EmoteController.create = async (name, imagePath, tags) => {
    if (!name) {
        throw new Error("Emote name cannot be null");
    }

    if (!imagePath) {
        throw new Error("An image file must be supplied");
    }

    try {
        const upload = await S3Controller.uploadFile(imagePath);

        return EmoteService.create(name, upload.Location, tags || []);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = EmoteController;