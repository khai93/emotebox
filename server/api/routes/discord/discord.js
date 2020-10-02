const { Router } = require('express');
const { BotController } = require("../../../controllers");
const { CheckAuth, ControllerHandler: ch, CheckEmojiPermission, CheckGuildPermission } = require("../../middlewares");
const { DiscordValidate } = require("../../validations");
const route = Router();

module.exports = async (app) => {
    app.use("/discord", route);

    route.get("/servers", CheckAuth, ch(BotController.getUserConnectedGuilds, (req, res, next) => [req.user]))

    route.post("/emoji/:id/edit", CheckAuth, ...DiscordValidate("editEmojiById"), CheckEmojiPermission, ch(BotController.editEmojiById, (req, res, next) => [req.param.id, req.body]))

    route.post("/emoji/:id/delete", CheckAuth, ...DiscordValidate("deleteEmojiById"), CheckEmojiPermission, ch(BotController.deleteEmojiById, (req, res, next) => [req.param.id]))

    route.post("/guild/:id/createEmoji", CheckAuth, ...DiscordValidate("createEmoji"), CheckGuildPermission, ch(BotController.createEmoji, (req, res, next) => [req.param.id, req.body.emoteId])
    )
}
