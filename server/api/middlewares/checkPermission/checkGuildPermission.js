const { BotService } = require('../../../services');

async function checkGuildPermission (req, res, next) {
    const guild = await BotService.getGuildById(req.params.id);
    if (guild) {
        const guildMember = guild.members.cache.find(member => member.id === req.user.id);

        if (guildMember && guildMember.hasPermission(1073741824))
            return next();
    }
    
    
    res.sendStatus(401)
}

module.exports = checkGuildPermission;