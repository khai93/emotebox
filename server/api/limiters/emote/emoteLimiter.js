const rateLimit = require("express-rate-limit");
const MongoStore = require("../../../utils/mongoStore");

const EmoteLimiter = rateLimit({
    store: MongoStore,
    windowMs: 60 * 60 * 1000,
    max: 20000,
    message: "Too many requests were made to this endpoint!, try again after an hour!"
});

const CreateEmoteLimiter = rateLimit({
    store: MongoStore,
    windowMs: 60*60*1000,
    max: 100,
    message: "You created too many emotes! Please try again later."
});

const EditEmoteLimiter = rateLimit({
    store: MongoStore,
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "You've edited too many emotes! Please try again later."
});

module.exports = {
    EmoteLimiter,
    CreateEmoteLimiter,
    EditEmoteLimiter
};