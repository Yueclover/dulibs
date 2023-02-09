const token = require('../token')
const config = require('../config')
const user = require('../route_handlers/user')
const refresh = {}
refresh.refreshToken = function (req, res) {
    //    重新创建token
    // req.uname,req.utel
    const userInfo = {
        uname: req.body.uname,
        tel: req.body.tel
    }
    const tokenValue = token.setToken(userInfo, config.jwtSecretKey, 2 * 60 * 60)
    const refreshToken = token.setToken(userInfo, config.jwtSecretKeyRefresh, 14 *  24 * 60 *60)
    return res.send({
        token:tokenValue,
        refreshToken: refreshToken
    })
}
module.exports = refresh