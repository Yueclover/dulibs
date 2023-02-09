const db = require("../mySql/connectSql")

const cart = {}
// 添加商品至购物车
// 1.查找购物车中是否存在该商品
// 2.若不存在，则直接添加，数量设置为0
// 3.若存在，则数量+1
cart.add = function (req, res) {
    let sql = "select * from cart where uid = ? and gid =?"
    db.query(sql, [req.body.uid, req.body.gid], (err, result) => {
        // 查询失败
        if (err) {
            return res.send(
                {
                    status: false,
                }
            )
        }
        // 查询成功

        // 存在商品
        // 数量+1
        if (result.length > 0) {
            let sql = "update cart set gcount = gcount +? where uid = ? and gid = ?"
            db.query(sql, [req.body.gcount, req.body.uid, req.body.gid], (err, result) => {
                // 更新cart数据失败
                if (err) {
                    return res.send(
                        {
                            status: false,
                        }
                    )
                }
                // 更新成功
                return res.send({
                    status: true,
                })
            })
        } else {
            // 不存在商品
            let sql = "insert into cart (uid,gid) values(?,?)"
            db.query(sql, [req.body.uid, req.body.gid], (err, result) => {
                // 插入失败
                if (err) {
                    return res.send(
                        {
                            status: false,
                        }
                    )
                }
                // 插入成功
                return res.send({
                    status: true,
                })
            })
        }
    })
}
// 获取数据库中cart的数据
cart.getCart = function (req, res) {
    const getgid = "select gid,gcount from cart where uid = ?"
    const getgooddetail = "select * from good where gid = ?"
    db.query(getgid, req.query.uid, (err, result) => {
        // 查询失败
        if (err) {
            return res.send(
                {
                    status: false,
                }
            )
        }
        //查询成功
        var result3 = []
        for (let i = 0; i < result.length; i++) {
            result3.push(new Promise((resolve, reject) => {
                db.query(getgooddetail, result[i].gid, (err, result2) => {
                    if (err) {
                        reject(err)
                    } else {
                        result2[0].gcount = result[i].gcount
                        resolve(
                            // gcount: result[i].gcount,
                            result2[0],
                        )
                    }
                })
            }))
        }
        Promise.all(result3).then(value => {
            return res.send({
                status:true,
                data: value,
            })
        }, err => {
            return res.send({
                status:false,
            })
        })

    })
}
// 删除购物车中的数据
cart.deleteCart = function (req, res) {
    const sql = "delete from cart where uid=? and gid=?"
    db.query(sql, [req.body.uid, req.body.gid], (err, result) => {
        if (err) {
            return res.send(
                {
                    status: false,
                }
            )
        }
        return res.send({
            status: true,
        })
    })
}
module.exports = cart