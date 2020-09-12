
const base64Helper = {};

base64Helper.encode = (data) => {
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return Buffer.from(str).toString('base64');
}

module.exports = base64Helper;