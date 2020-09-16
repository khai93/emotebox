const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const Pack = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        installs: {
            type: Number,
            default: 0
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