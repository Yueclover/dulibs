//用于生成和解析token
const { reject } = require('core-js/fn/promise');
var jwt = require('jsonwebtoken');
const config = require('./config')
const token = {}
token.setToken = function (userinfo, signatrue, timer) {
    const token = 'Bearer ' + jwt.sign(userinfo, signatrue, { expiresIn: timer })
    return token
}

token.verToken = async function (token, signatrue) {
    await jwt.verify(token.replace('Bearer ', ''), signatrue, function (err, data) {
        if (err) return false
        else return true
    })
}

module.exports = token
