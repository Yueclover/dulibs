const db = require('../mySql/connectSql')
const token = require('../token')
const jwt = require('jsonwebtoken')
const alipaySdk = require('../mySql/alipay') 
const AliPayFormData = require('alipay-sdk/lib/form').default

const pay = {}
// 发起支付
pay.payment = function(req,res){
    let oid = req.body.oid
    let oprice = req.body.oprice
    let name = req.body.name

    const formData = new AliPayFormData()
    formData.setMethod('get')
    formData.addField('bizContent',{
        outTradeNo:oid,
        productCode:'FAST_INSTANT_TRADE_PAY',
        totalAmount:oprice,//价格 
        subject:name,//商品名称
    })
    // 支付成功或失败跳转的链接
    formData.addField('returnUrl','http://localhost:8080/payment')
    const result = alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        {formData:formData},
    )
    // 对接支付宝成功，支付宝方返回的数据
    result.then(resp=>{
        res.send({
            code:200,
            success:true,
            msg:'支付中',
            paymentUrl:resp
        })
    })
}
module.exports = pay