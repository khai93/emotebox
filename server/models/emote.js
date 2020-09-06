const mongoose = require("mongoose");

const Emote = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        },
        tags: {
            type: [String]
        }
    }
)

module.exports = mongoose.Model('Emote', Emote);
module.exports.Schema = Emote;