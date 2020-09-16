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

PackController.create = (user, name, tagsParam) => {
    if (typeof name == 'undefined' || name === '') {
        throw new Error("Name must be supplied in order to create");
    }

    if (!tagsParam || Object.keys(tagsParam).length === 0) {
        throw new Error("Tags must be supplied in order to create");
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

    return PackService.create(name, tags, user.id);

}

PackController.addEmotesToPack = (id, emoteIDsParam) => {
    if (typeof id == 'undefined') {
        throw new Error("A ID must be provided in order to add emotes")
    }

    if (!emoteIDsParam || Object.keys(emoteIDsParam).length === 0) {
        throw new Error("Emote ID(s) must be supplied in order to create");
    }

    let emoteIDs;

    // POSTMAN MIGHT SEND AS STRING
    if (typeof emoteIDsParam == "string") {
        try {
            emoteIDs = JSON.parse(emoteIDsParam);
        } catch (e) {
            throw new Error(e);
        }
    }


}


module.exports = PackController;