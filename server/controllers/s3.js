const fs = require("fs");
const { S3Service } = require("../services");
const config = require("../config");
const randtoken = require('rand-token');

const S3Controller = {}

S3Controller.uploadFile = (source) => {
    return new Promise((resolve, reject) => {
        fs.readFile(source, async (err, data) => {
            if (err) {
                return reject(err)
            }

            try {
                const fileName = "emotes/" + randtoken.generate(8) +".png";
                const uploadResponse = await S3Service.uploadFile(data, fileName, config.aws.bucketName);
                
                // Delete File After Upload
                fs.unlink(source, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(uploadResponse)
                })
            } catch(e) {
                return reject(e)
            }
        
        })
    })
}

S3Controller.retrieveFile = (filename) => S3Service.retrieveFile("emotes/" + filename , config.aws.bucketName);

module.exports = S3Controller;