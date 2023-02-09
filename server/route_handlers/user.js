const db = require('../mySql/connectSql')
const token = require('../token')
const jwt = require('jsonwebtoken')
const config = require('../config')

const user = {}
user.register = function (req, res) {
    const sql = "select * from user where tel = ?"
    db.query(sql, req.body.tel, (err, result) => {
        if (err) {
            return res.send({
                status: false,
            })
        }
        // tel已注册
        if (result.length) {
            return res.send({
                code: 0,//已注册
                status: false,
            })
        } else {
            const sql2 = "insert into user (tel,psd) values(?,?)"
            db.query(sql2, [req.body.tel, req.body.psd], (err, result) => {
                if (err) {
                    return res.send({
                        status: false,
                    })
                }
                return res.send({
                    code: 1,//未注册,注册成功
                    status: true,
                })
            })
        }
    })
}
user.login = function (req, res) {
    const getTel = "select * from user where tel = ?"
    const saveRefreshToken = "update user set refreshToken = ? where tel = ?  "
    db.query(getTel, req.body.tel, (err, result) => {
        if (err) {
            return res.send({
                status: false,
            })
        }
        // 手机号未注册
        if (result.length == 0) {
            return res.send({
                code: 0,//不存在用户
                status: false,
            })
        }
        if (req.body.psd != result[0].psd) {
            return res.send({
                code: 1,//密码不正确
                status: false,
            })
        } else {
            // 密码正确
            const userinfo = {
                uname: result[0].uname,
                tel: result[0].tel
            }
            // 生成refreshToken
            // 生成token
            const tokenValue = token.setToken(userinfo, config.jwtSecretKey,  2 * 60 *60)
            const refreshToken = token.setToken(userinfo, config.jwtSecretKey, 14 *  24 * 60 *60)
            db.query(saveRefreshToken, [refreshToken, req.body.tel], (err, result2) => {
                if (err) {
                    return res.send({
                        status: false,
                    })
                }
                return res.json({
                    code: 2,//登陆成功
                    status: true,
                    data: {
                        userInfo: {
                            uid: result[0].uid,
                            uname: result[0].uname,
                            tel: result[0].tel,
                            imgUrl: result[0].imgUrl,
                        },
                        token: tokenValue,
                        refreshToken: refreshToken,
                    },
                })
            })

            // const token = 'Bearer ' + jwt.sign(userinfo, config.jwtSecretKey, { expiresIn: '3s' })

        }

    })
}
module.exports = user