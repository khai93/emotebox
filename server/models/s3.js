const S3 = {}

S3.load = (client) => {
    S3.client = client;
}

S3.upload = async (params) => {
    return new Promise((resolve, reject) => {
        S3.client.upload(params, (err, data) => {
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}

S3.get = async (params) => {
    return new Promise((resolve, reject) => {
        S3.client.getObject(params, (err, data) => {
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}
 
module.exports = S3;