const db = require('../mySql/connectSql')
const address = {}
address.selectsql = function () {
    return "select * from address where uid = ?"
}
address.getMyAddress = function (req, res) {
    new Promise((resolve, reject) => {
        db.query(address.selectsql(), req.query.uid, (err, result) => {
            if (err) {
                reject({
                    code: 0,
                    status: false,
                })
            } else {
                resolve({
                    code: 1,
                    status: true,
                    data: result
                })
            }

        })
    }).then(result => {
        res.send(result)
    }, err => {
        res.send(err)
    })

}
address.getOneAddress = function (req, res) {
    const sql = "select * from address where uid=? and addId=?"
    db.query(sql,[req.query.uid,req.query.addId],(err,result)=>{
        if(err){
            return res.send({
                code:0,
                status:false,
            })
        }else{
            return res.send({
                code:1,
                status:true,
                data:result[0]
            })
        }
    })
}
address.addMyAddress = function (req, res) {
    const sql1 = "select * from address where status = 1 and uid=?"
    const sql2 = "update address set status = 0 where addId = ?"
    const sql3 = "insert address (uid,consigneeName, consigneeTel, consigneePC,consigneeDetailAdd, status) values(?,?,?,?,?,?)"
    // 若req.body.status == 1 ,查询是否存在默认地址,
    if (req.body.status == 1) {
        db.query(sql1, req.body.uid, (err, result) => {
            if (err) {
                res.send({
                    code: 0,
                    status: false,
                })
            } else if (result.length) {
                // 若存在，则改变其未0,然后插入
                db.query(sql2, result[0].addId, (err, result2) => {
                    if (err) {
                        res.send({
                            code: 0,
                            status: false,
                        })
                    } else {
                        db.query(sql3, [req.body.uid, req.body.consignee, req.body.tel, req.body.region, req.body.fullAddress, 1], (err, result3) => {
                            if (err) {
                                res.send({
                                    code: 0,
                                    status: false,
                                })
                            } else {
                                res.send({
                                    code: 1,
                                    status: true,
                                })
                            }
                        })
                    }
                })
            } else {
                // 不存在，直接插入
                db.query(sql3, [req.body.uid, req.body.consignee, req.body.tel, req.body.region, req.body.fullAddress, 1], (err, result4) => {
                    if (err) {
                        res.send({
                            code: 0,
                            status: false,
                        })
                    } else {
                        res.send({
                            code: 1,
                            status: true,
                        })
                    }
                })
            }
        })
    } else {
        db.query(sql3, [req.body.uid, req.body.consignee, req.body.tel, req.body.region, req.body.fullAddress, 0], (err, result5) => {
            if (err) {
                res.send({
                    code: 0,
                    status: false,
                })
            } else {
                res.send({
                    code: 1,
                    status: true,
                })
            }
        })
    }

}
address.updateMyAddress = function (req, res) {
    const sql1 = "select * from address where status = 1 and uid=?"//查询是否存在默认地址
    const sql2 = "update address set status = 0 where addId = ? and uid=? "//修改为1的数据元组
    const sql3 = "update address set status = ? where addId = ? and uid=?"//设为默认
    const sql4 = "update address set status=?,consigneeName = ?,consigneeTel=?,consigneePC=?,consigneeDetailAdd=? where addId = ? and uid=?"
    // 若req.body.status == 1 ,查询是否存在默认地址,
    if (req.body.status == 1) {
        db.query(sql1, req.body.uid, (err, result1) => {
            if (err) {
                res.send({
                    code: 0,
                    status: false,
                })
            } else if (result1.length) {  // 若存在，则改变其为0,然后插入
                db.query(sql2, [result1[0].addId, result1[0].uid], (err, result2) => {
                    if (err) {
                        res.send({
                            code: 0,
                            status: false,
                        })
                    } else {
                        // 判断req.body参数length
                        if (Object.values(req.body).length > 3) {
                            // 编辑信息
                            db.query(sql4, [req.body.status, req.body.consignee, req.body.tel, req.body.region, req.body.fullAddress, req.body.addId, req.body.uid], (err, result) => {
                                if (err) {
                                    res.send({
                                        code: 0,
                                        status: false,
                                    })
                                } else {
                                    res.send({
                                        code: 1,
                                        status: true,
                                        // data: result
                                    })
                                }
                            })
                        } else {
                            // 设置默认
                            // 若req.body.status == 1 ,查询是否存在默认地址,
                            db.query(sql3, [1,req.body.addId, req.body.uid], (err, result) => {
                                if (err) {
                                    res.send({
                                        code: 0,
                                        status: false,
                                    })
                                } else {
                                    res.send({
                                        code: 1,
                                        status: true,
                                        // data: result
                                    })
                                }
                            })
                        }
                    }
                })
            } else {//不存在，直接插入
                if (Object.values(req.body).length > 3) {
                    // 编辑信息
                    db.query(sql4, [1, req.body.consignee, req.body.tel, req.body.region, req.body.fullAddress, req.body.addId, req.body.uid], (err, result) => {
                        if (err) {
                            res.send({
                                code: 0,
                                status: false,
                            })
                        } else {
                            res.send({
                                code: 1,
                                status: true,
                                // data: result
                            })
                        }
                    })
                } else {
                    // 设置默认
                    // 若req.body.status == 1 ,查询是否存在默认地址,
                    db.query(sql3, [1,req.body.addId, req.body.uid], (err, result) => {
                        if (err) {
                            res.send({
                                code: 0,
                                status: false,
                            })
                        } else {
                            res.send({
                                code: 1,
                                status: true,
                                data: result
                            })
                        }
                    })
                }
            }
        })
    }else{
        if (Object.values(req.body).length > 3) {
            // 编辑信息
            db.query(sql4, [req.body.status, req.body.consignee, req.body.tel, req.body.region, req.body.fullAddress, req.body.addId, req.body.uid], (err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        status: false,
                    })
                } else {
                    res.send({
                        code: 1,
                        status: true,
                        // data: result
                    })
                }
            })
        } else {
            // 设置默认
            // 若req.body.status == 1 ,查询是否存在默认地址,
            db.query(sql3, [req.body.status,req.body.addId, req.body.uid], (err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        status: false,
                    })
                } else {
                    res.send({
                        code: 1,
                        status: true,
                        // data: result
                    })
                }
            })
        }
    }
}
address.deleteOneAddress = function (req, res) {
    const sql = "delete from address where uid=? and addId=?"
    db.query(sql,[req.query.uid,req.query.addId],(err,result)=>{
        if(err){
            return res.send({
                code:0,
                status:false,
            })
        }else{
            return res.send({
                code:1,
                status:true,
            })
        }
    })
}
module.exports = address