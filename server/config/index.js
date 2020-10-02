const env = require('dotenv').config();

if (env.error) {
    throw env.error;
}

const path = require('path');


module.exports = {
    // PORT
    port: parseInt(process.env.PORT, 10) || 4000,

    // API configs
   
    api: {
        prefix: "/api",
        publicURL: process.env.PUBLIC_URL || "http://localhost:3000",
        baseURL: process.env.BASE_URL || "http://localhost:5000",
    },

    // Auth secrets
    authSecret: 'super-secret-code',

    // Discord configs
    discord: {
        token: process.env.DISCORD_TOKEN,
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        scopes: ['identify', 'guilds'],
        prompt: "consent",
    },

    // MongoDB 
    databaseURL: process.env.MONGODB_URL,

    // AWS
    aws: {
        accessId: process.env.AWS_ACCESS_ID,
        accessKey: process.env.AWS_SECRET_KEY,
        bucketName: process.env.AWS_BUCKET_NAME || "emotebox"
    },

    // Multer
    multerStorage: {
        destination: "uploads/",
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
}