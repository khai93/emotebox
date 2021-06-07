const S3Model = {}

S3Model.load = (client) => {
    S3Model.client = client;
}

S3Model.upload = async (params) => {
    return new Promise((resolve, reject) => {
        S3Model.client.upload(params, (err, data) => {
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}

S3Model.get = async (params) => {
    return new Promise((resolve, reject) => {
        S3Model.client.getObject(params, (err, data) => {
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}
 
module.exports = S3Model;
