const { Router } = require("express");
const auth = require("./routes/auth"); 
const emote = require("./routes/emote");
const discord = require("./routes/discord");

module.exports = () => {
    const app = Router();
    auth(app);
    emote(app);
    discord(app);
    
    return app;
}