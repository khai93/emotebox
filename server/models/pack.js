const mongoose = require('mongoose');

const Pack = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        likes: {
            type: Number
        },
        tags: {
            type: [String]
        },
        emotes: [
            {type: ObjectId, ref: 'Emote'}
        ]
    }
)

module.exports = mongoose.Model('Pack', Pack);
module.exports.Schema = Pack;