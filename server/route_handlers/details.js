const db = require('../mySql/connectSql')

// 获取商品详情by gid(一个)
const getOneDetails= function (req, res) {
    const sql = "select * from good where gid = ?"
    db.query(sql, req.query.gid, (err, result) => {
        // 查询失败
        if (err) {
            return res.send(
                {
                    status: false,
                }
            )
        }
        // 查询成功
        return res.send(
            {
                status: true,
                data: result[0]
            }
        )
    })
}
// details.array = function (req, res) {
//     const getgooddetail = "select * from good where gid = ?"
//     const result = req.query.cart
//     console.log(result);
//     var result3 = []
//     for (let i = 0; i < result.length; i++) {
//         result3.push(new Promise((resolve, reject) => {
//             db.query(getgooddetail, result[i], (err, result2) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     result2[0].gcount = 1
//                     resolve(
//                         // gcount: result[i].gcount,
//                         result2[0],
//                     )
//                 }
//             })
//         }))
//     }
//     Promise.all(result3).then(value => {
//         return res.send({
//             status: true,
//             data: value,
//         })
//     }, err => {
//         return res.send({
//             status: false,
//         })
//     })
// }
module.exports = getOneDetails