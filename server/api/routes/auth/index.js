const {Router} = require('express');
const passport = require('passport');
const {CheckAuth} = require("../../../middlewares/");
const config = require("../../../config");
const { json } = require('body-parser');
const route = Router();

module.exports = async (app) => {
    app.use("/auth", route);
    route.get("/discord", passport.authenticate('discord', {scope: config.scopes, prompt: config.prompt}), ()=>{});
    route.get("/discord-callback", 
        passport.authenticate('discord', {failureRedirect: config.publicURL + '/login'}), (req, res) => {
            res.redirect(config.publicURL + "/");
        }
    );
    route.get("/signout", function(req, res) {
        req.logout();
        res.redirect(config.publicURL + "/login");
    });
    route.get("/user", CheckAuth, (req, res) => {
        res.json(req.user);
    });
}
