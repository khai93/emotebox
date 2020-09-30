const { EmoteService } = require("../services");

/**
 * @namespace EmoteUtil
 */
const EmoteUtil = {};

/**
 * Check if a user owns an emote
 * @param {string} emote_id 
 * @param {string} user_id 
 * @returns {Promise<bool>}
 */
EmoteUtil.checkIfEmoteOwner = (emote_id, user_id) => {
    return new Promise(async (resolve, reject) => {
        const emote = (await EmoteService.getById(emote_id))[0];

        if (emote.creator_id != user_id) {
            return resolve(false);
        }

        return resolve(true);
    })
}




module.exports = EmoteUtil;