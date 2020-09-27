const { body, query, param, checkSchema } = require('express-validator');
const { Validate } = require("../utils")

const MongoDbValidDocumentIdRegex = /^[0-9a-fA-F]{24}$/;

const validations = {
    getById: [
        param('id', 'id is invalid').exists().isString().matches(MongoDbValidDocumentIdRegex)
    ],
    getByCreatorId: [
        param('id', 'id is invalid').exists().isString()
    ],
    create: [
        body('tags', 'tags is invalid').optional().isArray(),
        body('emoteName', 'emoteName is invalid').exists().isString(),
        checkSchema({
            'file': {
                custom: {
                    options: (value, {req, path}) => !!req.file,
                    errorMessage: "emote file was not provided"
                }

            }
        })

    ],
    searchByText: [
        query('limit').optional().isInt(),
        query('startAt').optional().isInt(),
        query('searchTerm', "searchTerm is invalid").exists().isString()
    ],
    editById: [
        body('emote_id', 'emote_id is invalided').exists().isString().matches(MongoDbValidDocumentIdRegex),
        body('name').optional().isString(),
        body('tags').optional().isArray()
    ],
    editTag: [
        body('emote_id', 'emote_id is invalided').exists().isString().matches(MongoDbValidDocumentIdRegex),
        body('tag').exists().isString()
    ]
}

/**
 * @param {string} method
 * @returns {Validate}
 */
const EmoteValidate = (method) => Validate(method, validations);

module.exports = EmoteValidate;