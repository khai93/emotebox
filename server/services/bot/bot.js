const {Discord, Client, User, GuildEmoji} = require('discord.js');

/**
 * @namespace Bot
 */
const BotService = {}

/**
 * injects client into Bot
 * @param {Client} client - discord client
 */
BotService.load = function(client) {
    this.client = client;
}

/**
 * Get users guilds that authorized the bot 
 * @param {User} user 
 * @returns {Promise<Array<Guild>>}
 */
BotService.getUserConnectedGuilds = function(user) {
    return Promise.resolve(
        this.client.guilds.cache.filter(guild => {
            const userFound = guild.members.cache.find(member => member.id === user.id);
            return (
                userFound ? userFound.hasPermission(1073741824) : []
            );
        })
    )
}

/**
 * Get a guild by Id
 * @param {string} guild_id - Snowflake
 * @returns {Promise<Guild>}
 */
BotService.getGuildById = function(guild_id) {
    return Promise.resolve(this.client.guilds.cache.find(guild => guild.id === guild_id));
}

/**
 * Get an emoji by id
 * @param {string} emoteId - Snowflake
 */
BotService.getEmojiById = function(emoteId) {
    return Promise.resolve(this.client.emojis.cache.find(emote => emote.id === emoteId));
}

/**
 * Edit an emoji
 * @param {GuildEmoji} emote 
 * @param {GuildEmojiEditData} editObject 
 */
BotService.editEmoji = function (emote, editObject) {
    return emote.edit(editObject);
}

/**
 * Delete an emoji
 * @param {GuildEmoji} emote 
 * @param {string} reason 
 */
BotService.deleteEmoji = function (emote, reason) {
    return emote.delete(reason)
}

/**
 * Create an emoji in a guild
 * @param {Guild} guild
 * @param {string} imageKey 
 * @param {string} name 
 */
BotService.createEmoji = function (guild, imageKey, name) {
    return guild.emojis.create(imageKey, name);
}


module.exports = BotService;