const mongoose = require("mongoose");

const Emote = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        tags: {
            type: [String]
        }
    }
)

Emote.index({'$**': 'text'});

module.exports = mongoose.model('Emote', Emote);
module.exports.Schema = Emote;