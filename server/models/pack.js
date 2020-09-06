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

Pack.index({'$**': 'text'});

module.exports = mongoose.model('Pack', Pack);
module.exports.Schema = Pack;