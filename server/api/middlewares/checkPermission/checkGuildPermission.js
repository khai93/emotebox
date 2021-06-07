const { BotService } = require('../../../services');

async function checkGuildPermission (req, res, next) {
    const guild = await BotService.getGuildById(req.params.id);

    if (guild && guild.ownerID === req.user.id) {
        return next();
    }
    
    
    return res.sendStatus(401);
}

module.exports = checkGuildPermission;