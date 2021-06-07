const { validationResult } = require('express-validator'),
      Validate = require('./validate'),
      assert = require('assert');


const mockValidations = {
    'mock1': [],
    'mock2': []
}

describe("Validate Middleware", () => {
    describe('#Validate', () => {
        it('should return an array of length 2', () => {
            assert.strictEqual(Validate('mock1', mockValidations).length == 2, true)
        });

        it('should throw an error if given method is undefined or is not a string', () => {
            const expected = Error;
            assert.throws(() => Validate(2, validations), expected);
            assert.throws(() => Validate(), expected);
        });

        it('should throw an error if given method is not a value in given validations array', () => {
            const expected = Error;
            assert.throws(() => Validate('da', validations), expected)
        })
    });
});
