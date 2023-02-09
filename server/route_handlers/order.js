const db = require("../mySql/connectSql")
const order = {}

order.submitOrder = function(req,res){
    const addsql = `insert into orders (oid,uid,oprice,oaddressId,orderList,ostatus) values (${req.body.oid},${JSON.parse(req.body.uid)},${JSON.parse(req.body.oprice)},${JSON.parse(req.body.oaddressId)},'${req.body.orderList}',${JSON.parse(req.body.ostatus)})`
    db.query(addsql,(err,result)=>{
        if(err){
            return res.send(
                {
                    code:0,
                    status: false,
                    msg:err.message
                }
            )
        }
        return res.send(
            {
                code:1,
                status: true,
            }
        )
    })
}
module.exports = order