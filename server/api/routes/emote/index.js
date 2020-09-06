const {Router} = require('express');
const passport = require('passport');
const config = require("../../../config");
const { json } = require('body-parser');
const route = Router();

module.exports = async (app) => {
    app.use("/emote", route);
    
}

