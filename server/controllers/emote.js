const { EmoteService } = require("../services/");

const EmoteController = {}

EmoteController.getEmotesByName = (name) => {
    if (name === '') {
        throw new Error("Emote name cannot be null");
    }
    return EmoteService.getEmotesByName(name);
}

module.exports = EmoteController;