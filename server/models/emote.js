const mongoose = require("mongoose");

const Emote = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageKey: {
            type: String,
            required: true
        },
        installs: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String]
        }
    }
)

Emote.index({'$**': 'text'});

module.exports = mongoose.model('Emote', Emote);
module.exports.Schema = Emote;