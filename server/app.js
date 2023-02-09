// 引入 express 框架 -> 需 npm 安装
const express = require('express');
const expressJWT = require('express-jwt')// 解析 token 的中间件
const config = require('./config')// 导入配置文件
const path = require('path');
const tokenobj = require('./token')

/**
 * 初始化框架,并将初始化后的函数给予 '当前页面'全局变量 app
 * 也就是说, app 是 express 
 */
var app = express();

// 设置 public 为静态文件的存放文件夹
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 配置中间件
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({ path: [/^\/images\//, /^\/noauth\// , /^\/refresh\//] }))
// app.use(expressJWT({
//     secret: config.jwtSecretKeyRefresh
// }).unless({ path: [/^\/images\//, /^\/noauth\// , /^\/auth\//]}))
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证

//当token失效返回提示信息
app.use(function (err, req, res, next) {
    if (err.status == 401) {
        return res.status(401).send('token失效');
    }
});

// 引入路由
const cartRouter = require('./routes/cart');
const detailsRouter = require('./routes/details');
const userRouter = require('./routes/user');
const addressRouter = require('./routes/address');
const refreshTokenRouter = require('./routes/refreshToken');
const submitOrderRouter = require('./routes/order');
const pay = require('./routes/pay');
// 配置路由
app.use(cartRouter)
app.use(detailsRouter)
app.use(userRouter)
app.use(addressRouter)
app.use(refreshTokenRouter)
app.use(submitOrderRouter)
app.use(pay)
// 开启服务器
app.listen(8081, function () {

    console.log("Node.JS 服务器已启动，访问地址： http://127.0.0.1:8081")

})