const { validationResult } = require('express-validator')

/**
 * Validates an express api route
 * 
 * @param {string} method
 * @param {Object.<string, ValidationChain[]>} validations 
 * 
 * @example <caption>Should be spread as middleware in an express route</caption>
 *      route.get("test", ...Validate("testControllerMethod", validations), (req, res) => { res.send("OK") })
 * @returns {Array<ValidationChain[] | RequestHandler>}
 */
function Validate(method, validations) {
    if (typeof method == 'undefined' || typeof method != 'string') {
        throw new Error("Validation Method is not a string or is not defined")
    }

    const findValidation = Object.keys(validations).findIndex(v => v.toLowerCase() === method.toLowerCase())

    if (findValidation === -1) {
        throw new Error("Given Method does not have a associated validation!")
    }

    const methodValidations = validations[Object.keys(validations)[findValidation]];

    return [
        methodValidations,
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            return next()
        }
    ]
}   

module.exports = Validate;