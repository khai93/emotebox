const { BotService } = require('../../../services');

function checkGuildPermission (req, res, next) {
    const guild = BotService.getGuildById(req.param.id);
    const guildMember = guild.members.cache.find(member => member.id === req.user.id);

    if (guildMember && guildMember.hasPermission(1073741824))
        return next();
    
    res.sendStatus(401)
}

module.exports = checkGuildPermission;