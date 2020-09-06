const PackModel = require("../models/pack")

const PackService = {}

PackService.getAllByName = (name) => PackModel.find({ name }).exec();
PackService.getById = (id) => PackModel.find({ _id: id }).exec();
PackService.searchByText = (string, startAt, limit) => PackModel.find({$text: string}).skip(startAt).limit(limit).exec()
PackService.create = (name, imagePath, tags) => PackModel.create({name, imagePath, tags}).exec();

module.exports = PackService;