const { BotService, EmoteService } = require('../../services');
const S3Controller = require("../../controllers/s3")
const config = require('../../config')
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
        const Emote = (await EmoteService.getById(emote_id))[0];
        const Guild = await BotService.getGuildById(guild_id);
        const file = await S3Controller.retrieveFile(Emote.imageKey);
        
        // increment installs on emote
        const increment = await EmoteService.incrementInstallsById(emote_id);

        return BotService.createEmoji(Guild, file.Body, Emote.name);
    } catch (e) {
        throw e;
    }
}

BotController.getInviteLink = () => Promise.resolve({link: `https://discord.com/oauth2/authorize?client_id=${config.discord.clientID}&scope=bot&permissions=1073741824`})

module.exports = BotController;