const { body, query, param } = require('express-validator');
const { Validate } = require("../middlewares")

const validations = {
    editEmojiById: [
        param("id", "id is invalid").exists().isString(),
        body("name", "name is invalid").optional().isString(),
        body("roles", "roles is invalid").optional().isArray()
    ],
    deleteEmojiById: [
        param("id", "id is invalid").exists().isString()
    ],
    createEmoji: [
        param("id", "id is invalid").exists().isString(),
        body("emoteId", "emoteId is invalid").exists().isString()
    ]
}

/**
 * @param {string} method
 * @returns {Validate}
 */
const DiscordValidate = (method) => Validate(method, validations);

module.exports = DiscordValidate;