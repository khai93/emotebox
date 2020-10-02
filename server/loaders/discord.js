const Discord = require('discord.js');
const { BotService } = require('../services/');
const config = require("../config");

module.exports = async () => {
    const client = new Discord.Client();

    client.on('ready', () => {
        BotService.load(client);
        console.log(`Discord Bot loaded! Bot User: ${client.user.tag}`);
    });

    client.login(config.discord.token);
}