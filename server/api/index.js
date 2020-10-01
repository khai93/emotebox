const { Router } = require("express");
const auth = require("./routes/auth"); 
const emote = require("./routes/emote");
const pack = require("./routes/pack");

module.exports = () => {
    const app = Router();
    auth(app);
    emote(app);
    pack(app);
    
    return app;
}