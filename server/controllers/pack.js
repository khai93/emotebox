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


module.exports = PackController;