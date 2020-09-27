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
EmoteService.getByCreatorId = (id) => EmoteModel.find({ creator_id: id }).exec();

/**
 * Edit an emote by its document ID
 * @param {string} id 
 * @param {string} [name] 
 * @param {string[]} [tags] 
 * @param {string} [imageKey] 
 * @param {string} [creator_id] 
 * @returns {Promise<Document[]>}
 */
EmoteService.editById = (id, name, tags, imageKey, creator_id) => EmoteModel.findOneAndUpdate({ _id: id }, {$set: {...(name && {name}), ...(tags && {tags}), ...(imageKey && {imageKey}), ...(creator_id && {creator_id})}}).exec();

/**
 * Append a tag to an emote
 * @param {string} id - document _id
 * @param {string} tag 
 * @returns {Promise<Document[]>}
 */
EmoteService.addTag = (id, tag) => EmoteModel.findOneAndUpdate({_id: id}, { "$push": { tags: tag } }).exec()

/**
 * Remove a tag from an emote
 * @param {string} id
 * @param {string} tag
 * @returns {Promise<Document[]>}
 */
EmoteService.removeTag = (id, tag) => EmoteModel.findOneAndUpdate({_id: id}, { "$pull": { tags: tag } }).exec()

module.exports = EmoteService;
