const EmoteModel = require("../models/emote");

/**
 * @namespace EmoteService
 */
const EmoteService = {}

/**
 * find every emote with the given name
 * @param {string} name 
 * @returns {Promise<Document[]>}
 */
EmoteService.getAllByName = (name) => EmoteModel.find({ name }).exec();

/**
 * Get an emote by its document ID
 * @param {string} id 
 * @returns {Promise<Document[]>}
 */
EmoteService.getById = (id) => EmoteModel.find({ _id: id }).exec();

/**
 * Search the entire collection with a string
 * @param {string} name 
 * @returns {Promise<Document[]>}
 */
EmoteService.searchByText = (string, startAt, limit) => EmoteModel.find({$text: { $search: string}}).skip(startAt).limit(limit).exec();

/**
 * Creates a new emote
 * @param {string} name 
 * @param {string} imageKey 
 * @param {string[]} tags 
 * @param {string} creator_id 
 * @returns {Promise<Document[]>}
 */
EmoteService.create = (name, imageKey, tags, creator_id) => EmoteModel.create({name, imageKey, tags, creator_id});

/**
 * find emotes created by a creator using the creators id
 * @param {string} id 
 * @returns {Promise<Document[]>}
 */
EmoteService.getByCreatorId = (id) => EmoteModel.find({ owner_id: id }).exec();

/**
 * Edit an emote by its document ID
 * @param {string} id 
 * @param {string} [name] 
 * @param {string[]} [tags] 
 * @param {string} [imageKey] 
 * @param {string} [creator_id] 
 */
EmoteService.editById = (id, name = null, tags = null, imageKey = null, creator_id = null) => EmoteModel.findOneAndUpdate({ _id: id }, {name, tags, imageKey, creator_id}).exec();

module.exports = EmoteService;
