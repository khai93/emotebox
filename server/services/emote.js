const EmoteModel = require("../models/emote");

const EmoteService = {}

EmoteService.getEmotesByName = (name) => EmoteModel.find({ name }).exec();


module.exports = EmoteService;
