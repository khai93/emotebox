const { body, query, param } = require('express-validator');
const { Validate } = require("../utils")

const validations = {
    retrieveImage: [
        param("filename", "filename is invalid").exists().isString()
    ]
}

/**
 * @param {string} method
 * @returns {Validate}
 */
const S3Validate = (method) => Validate(method, validations);

module.exports = S3Validate;