import { post, get, del, put } from "@/api/axios/request"
// refresh_token
export const refreshToken = (uname,tel) => {
    return post("/api/refreshtoken", {
        uname,tel
    })
}

// 通过商品ID获取商品详细信息
export const getGoodsDetailsById = (gid) => {
    return get("/api/noauth/goodsdetails", {
        params: {
            gid,
        },
    })
}
// 添加商品至购物车,改变商品数量
export const addGoodsToCart = (uid, gid, gcount = 1) => {
    return post("/api/auth/addcart", { uid, gid, gcount })
}
// 删除购物车商品
export const deleteCart = (uid, gid) => {
    return post("/api/auth/delcgood", {
        uid,
        gid
    })
}
// 获取数据库中cart中所有数据
export const getCart = (uid) => {
    return get("/api/auth/getcart", {
        params: {
            uid,
        }
    })
}
// 注册
export const register = (tel, psd) => {
    return post("/api/noauth/register", {
        tel,
        psd,
    })
}
// 登录
export const login = (tel, psd) => {
    return post("/api/noauth/login", {
        tel,
        psd,
    })
}
// 地址
//   获取全部地址
export const getMyAddress = (uid) => {
    return get("/api/auth/getmyaddress", {
        params: { uid }
    })
}
// 查询地址
export const getOneAddress = (uid,addId) => {
    return get("/api/auth/getoneaddress", {
        params: { uid,addId }
    })
}
//  添加地址
export const addMyAddress = (uid,consignee, tel, region, fullAddress, status) => {
    return post("/api/auth/addmyaddress", {
        uid,consignee, tel, region, fullAddress, status
    })
}
//  update
export const updateMyAddress = (uid,addId,status,consignee, tel, region, fullAddress) => {
    return post("/api/auth/updatemyaddress", {
        uid, 
        addId,
        status,
        consignee, tel, region, fullAddress,
    })
}
// 删除地址
export const deleteOneAddress = (uid,addId) => {
    return get("/api/auth/deleteoneaddress", {
        params: { uid,addId }
    })
}
// 提交订单
export const submitOrder = (oid,uid,oprice,oaddressId,orderList,ostatus=1) => {
    return post("/api/auth/submitorder", {
        oid,uid,oprice,oaddressId,orderList,ostatus
    })
}
export const payment = (oid,oprice,name) => {
    return post("/api/auth/payment", {
        oid,oprice,name
    })
}
