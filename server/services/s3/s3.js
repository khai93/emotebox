const { S3Model } = require("../../models");

const S3Service = {}

S3Service.uploadFile = async (filedata, filename, bucketName) => {
    const params = {
        Bucket: bucketName,
        Key: filename,
        Body: filedata
    }

    return S3Model.upload(params);
}

S3Service.retrieveFile = async (filename, bucketName) => {
    const params = {
        Bucket: bucketName,
        Key: filename
    }

    return S3Model.get(params);
}

module.exports = S3Service;
