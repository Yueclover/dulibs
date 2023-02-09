export default{
    state:{
        token:null,
        refreshToken:null,
        // 用户信息：头像、昵称
        userInfo:{}
    },
    getters:{},
    mutations:{
        setLoginInfo(state,user){
            state.token =user.token
            state.refreshToken =user.refreshToken 
            state.userInfo = user.userInfo
            // 持久化存储
            localStorage.setItem('userInfo',JSON.stringify(user.userInfo))
            localStorage.setItem('token',JSON.stringify(user.token))
            localStorage.setItem('refreshToken',JSON.stringify(user.refreshToken))
        },
        // 退出登录
        setLoginOut(state){
            state.token =''
            state.userInfo = {}
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        },
        innitUserLoginInfo(state){
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            let token = JSON.parse(localStorage.getItem('token'))
            let refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
            if(token){
                // state.loginStatus = true
                state.token =token
                state.userInfo = userInfo
                state.refreshToken = refreshToken
            }else{
                state.token = ''
                state.userInfo = {}
                state.refreshToken = ''
            }
        },
    },
    actions:{

    }
}