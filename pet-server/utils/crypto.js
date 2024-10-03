const crypto = require("crypto")
const moment = require("./moment")

function md5(value){
    let obj = crypto.createHash('md5')
    obj.update(value)
    return obj.digest('hex')
}

module.exports = function crypto(value, key) {
    return md5(md5(value) + key + moment())
}