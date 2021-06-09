const { Router } = require('express');
const passport = require('passport');
const { CheckAuth } = require("../../middlewares");
const config = require("../../../config");
const route = Router();

module.exports = async (app) => {
    app.use("/auth", route);

    route.get("/discord", passport.authenticate('discord', {scope: config.discord.scopes, prompt: config.discord.prompt, display: 'popup'}));

    route.get("/discord-callback", passport.authenticate('discord', {successRedirect: config.api.publicURL + '/api/auth/discord/success', failureRedirect: config.api.publicURL + '/login'}));

    route.get("/signout", function(req, res) {
        req.logout();
        res.redirect(new URL("/login", config.api.publicURL));
    });

    route.get("/user", CheckAuth, (req, res) => {
        res.json(req.user);
    });
}
