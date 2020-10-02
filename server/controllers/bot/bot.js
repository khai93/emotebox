const { BotService, EmoteService } = require('../../services');

const BotController = {};

BotController.getUserConnectedGuilds = (user) => BotService.getUserConnectedGuilds(user);

BotController.editEmojiById = async (emoteId, editOpts) => {
    try {
        const emote = await BotService.getEmojiById(emoteId);

        return BotService.editEmoji(emote, editOpts);
    } catch(e) {
        throw e;
    }
}

BotController.deleteEmojiById = async (emoteId) => {
    try {
        const emote = await BotService.getEmojiById(emoteId);

        return BotService.deleteEmoji(emote);
    } catch (e) {
        throw e;
    }
}

BotController.createEmoji = async (guild_id, emote_id) => {
    try {
        const Emote = EmoteService.getById(emote_id);
        const Guild = BotService.getGuildById(guild_id);

        return BotService.createEmoji(Guild, Emote.imageKey, Emote.name);
    } catch (e) {
        throw e;
    }
}

module.exports = BotController;