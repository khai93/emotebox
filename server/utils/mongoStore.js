const config = require("../config");
const MongoStore = require('rate-limit-mongo');

module.exports = new MongoStore({
    uri: config.databaseURL
});