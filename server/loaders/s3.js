const AWS = require('aws-sdk');
const config = require('../config');
const { S3Model } = require('../models');

module.exports = () => {
    const s3 = new AWS.S3({
        accessKeyId: config.aws.accessId,
        secretAccessKey: config.aws.accessKey
    });

    S3Model.load(s3);
}