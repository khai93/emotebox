const env = require('dotenv').config()
if (env.error) {
    throw new Error("Couldn't find .env file")
}

module.exports = {
    // PORT
    port: parseInt(process.env.PORT, 10) || 4000,

    // API configs
    publicURL: process.env.publicURL || "http://localhost:3000",
    baseURL: process.env.baseURL || "http://localhost:5000",
    api: {
        prefix: "/api"
    },

    // Auth secrets
    authSecret: 'super-secret-code',

    // Discord configs
    clientID: '749417956903092294',
    clientSecret: process.env.clientSecret || 'secret',
    scopes: ['identify', 'guilds'],
    prompt: "consent",

    // MongoDB 
    databaseURL: process.env.MONGODB_URL,
}