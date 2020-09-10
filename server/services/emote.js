const EmoteModel = require("../models/emote");

const EmoteService = {}

EmoteService.getAllByName = (name) => EmoteModel.find({ name }).exec();
EmoteService.getById = (id) => EmoteModel.find({ _id: id }).exec();
EmoteService.searchByText = (string, startAt, limit) => EmoteModel.find({$text: string}).skip(startAt).limit(limit).exec();
EmoteService.create = (name, imageUrl, tags) => EmoteModel.create({name, imageUrl, tags});

module.exports = EmoteService;
