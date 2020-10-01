const PackModel = require("../models/pack")

const PackService = {}

PackService.getAllByName = (name) => PackModel.find({ name }).exec();
PackService.getById = (id) => PackModel.find({ _id: id }).exec();
PackService.searchByText = (string, startAt, limit) => PackModel.find({$text: { $search: string}}).skip(startAt).limit(limit).exec();
PackService.create = (name, tags, ownerDiscordId) => PackModel.create({name, tags, creator_id: ownerDiscordId});
PackService.findOneAndUpdate = (id, name, tags, emoteIDsToPush, installs) => PackModel.findOneANdUpdate({ _id: id}, {$set: {name, tags, installs}, $push: { emoteIDsToPush } })
module.exports = PackService;