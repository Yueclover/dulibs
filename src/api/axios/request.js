import axios from 'axios'
import that from '@/main'
import store from '@/store/index'

// 进行默认配置
const instance = axios.create({
    // baseURL: "/api",//默认地址
    timeout: 3000,//超时时间3s
    headers: {
        refresh: 'false',
        token: Boolean(true),
        Authorization: null,
    },
})
const refreshTokenInstance = axios.create({
    timeout: 3000,//超时时间3s
})
// instance.defaults.headers.common['Authorization'] = ''
// 添加请求拦截器，在请求头中加token
instance.interceptors.request.use(
    // 发送请求前做些事
    //1.添加loading加载效果
    //2.为post请求添加默认的Content-Type为表单数据格式
    //3.请求头中携带token 后台进行验证
    function (config) {
        that.$loading({ isshow: true })
        if (config.method == 'post') {
            config.headers['Content-type'] = 'application/x-www-form-urlencoded'
        }
        if (config.headers.token) {
            config.headers.Authorization = JSON.parse(localStorage.getItem('token'))
        }
        return config
    },
    // 请求错误做的事
    err => {
        console.log(err);
    }
)
// 添加响应拦截器
instance.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    that.$loading({ isshow: false })
    return res;
}, async function (error) {
    that.$loading({ isshow: false })
    if (error.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken')
        await refreshTokenInstance.post("/api/refresh/refreshtoken", {
            uname: store.state.user.userInfo.uname,
            tel: store.state.user.userInfo.tel,
        }, {
            headers: {
                Authorization: JSON.parse(refreshToken),
                refresh: 'true',//token是refreshToken吗
            },
        }).then(res => {
            console.log(res.data);
            localStorage.setItem("token", JSON.stringify(res.data.token))
            localStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken))
            console.log(error.response.config);
        })

        return instance(error.response.config)
    }
    return Promise.reject(error);
});
export default instance
export function post(url, data = {}, config = {}) {
    return instance.post(url, data, config)
}
export function get(url, config = {}) {
    return instance.get(url, config)
    // return new Promise((resolve, reject) => {
    //     instance.get(url, config)
    //         .then(res => {
    //             resolve(res);
    //         })
    //         .catch(
    //             err => {
    //                 reject(err)
    //             }
    //         )
    // })
}

export function del(url, config = {}) {
    return new Promise((resolve, reject) => {
        instance.delete(url, config)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.put(url, data)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}