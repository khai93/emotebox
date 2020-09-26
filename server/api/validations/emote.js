const { body, query, param } = require('express-validator');
const { Validate } = require("../utils")

const MongoDbValidDocumentIdRegex = /^[0-9a-fA-F]{24}$/;

const validations = {
    getById: [
        param('id', 'id is invalid').exists().isInt().matches(MongoDbValidDocumentIdRegex)
    ],
    getByCreatorId: [
        param('id', 'id is invalid').exists().isInt()
    ],
    create: [
        body('emoteName', 'emoteName is invalid').exists().isString(),
        body('emote_file', 'emote_file was not provided').exists()

    ],
    searchByText: [
        query('limit').optional().isInt(),
        query('startAt').optional().isInt(),
        query('searchTerm', "searchTerm is invalid").exists().isString()
    ],

}

/**
 * @param {string} method
 * @returns {Validate}
 */
const EmoteValidate = (method) => Validate(method, validations);

module.exports = EmoteValidate;