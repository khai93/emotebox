const { TagFaces } = require("@material-ui/icons");
const { PackService } = require("../services/");

const PackController = {}

PackController.getAllByName = (name) => {
    if (name === '') {
        throw new Error("Pack name cannot be null");
    }
    return PackService.getAllByName(name);
}

PackController.getById = (id) => {
    if (!id) {
        throw new Error("Pack Id cannot be null");
    }

    return PackService.getById(id);
}

PackController.searchByText = (query) => {
    if (typeof query == 'undefined') {
        throw new Error("Query must be supplied in order to search");
    }

    const limit = query.limit || 25;
    const startAt = query.startAt || 0;
    const searchTerm = query.searchTerm;

    if (typeof searchTerm == 'undefined' || searchTerm === '') {
        throw new Error("A search term must be supplied in order to search");
    }

    return PackService.searchByText(searchTerm, startAt, limit);
}

PackController.create = (name, tagsParam) => {
    if (typeof name == 'undefined' || name === '') {
        throw new Error("Name must be supplied in order to create");
    }

    if (!tags || Object.keys(tags).length === 0) {
        throw new Error("Tags must be supplied in order to create");
    }

    if (!emotes || Object.keys(emotes).length === 0) {
        throw new Error("Emotes must be supplied in order to create");
    }

    let tags;

    // POSTMAN MIGHT SEND AS STRING
    if (typeof tagsParam == "string") {
        try {
            tags = JSON.parse(tagsParam);
        } catch (e) {
            throw new Error(e);
        }
    }

    return PackService.create(name, tags);

}


module.exports = PackController;