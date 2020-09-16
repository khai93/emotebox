const PackModel = require("../models/pack")

const PackService = {}

PackService.getAllByName = (name) => PackModel.find({ name }).exec();
PackService.getById = (id) => PackModel.find({ _id: id }).exec();
PackService.searchByText = (string, startAt, limit) => PackModel.find({$text: string}).skip(startAt).limit(limit).exec()

// TODO
PackService.create = (name, tags) => PackModel.create({name, imagePath});

module.exports = PackService;