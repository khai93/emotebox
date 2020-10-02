const { BotService } = require('../../../services');

async function checkEmojiPermission (req, res, next) {
    const guildEmoji = await BotService.getEmojiById(req.params.id);
    const guild = guildEmoji.guild;
    const guildMember = guild.members.cache.find(member => member.id === req.user.id);

    if (guildMember && guildMember.hasPermission(1073741824))
        return next();
    
    res.sendStatus(401)
}

module.exports = checkEmojiPermission;