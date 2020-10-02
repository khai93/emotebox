const { BotService } = require('../../../services');

function checkEmojiPermission (req, res, next) {
    const guildEmoji = BotService.getEmojiById(req.param.id);
    const guild = guildEmoji.guild;
    const guildMember = guild.members.cache.find(member => member.id === req.user.id);

    if (guildMember && guildMember.hasPermission(1073741824))
        return next();
    
    res.sendStatus(401)
}

module.exports = checkEmojiPermission;