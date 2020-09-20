const EmoteModel = require("../models/emote");

const EmoteService = {}

EmoteService.getAllByName = (name) => EmoteModel.find({ name }).exec();
EmoteService.getById = (id) => EmoteModel.find({ _id: id }).exec();
EmoteService.searchByText = (string, startAt, limit) => EmoteModel.find({$text: { $search: string}}).skip(startAt).limit(limit).exec();
EmoteService.create = (name, imageKey, tags, creator_id) => EmoteModel.create({name, imageKey, tags, creator_id});
EmoteService.getByCreatorId = (id) => EmoteModel.find({ owner_id: id }).exec();
module.exports = EmoteService;
