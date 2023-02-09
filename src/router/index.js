import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/views/Home.vue'
import store from '@/store'


const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: "/home",
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false }
    },
    {
        path: "/categroy",
        name: 'Category',
        component: () => import("@/views/Category/Category.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: '/read',
        name: 'Read',
        component: () => import("@/views/Read.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import("@/views/Cart.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: '/my',
        name: 'My',
        component: () => import("@/views/My/My.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import("@/views/Detail.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: "/search",
        component: () => import("@/views/Search/Search.vue"),
        meta: {
            requiresAuth: false,
        },
        children: [
            {
                path: '',
                name: 'SearchIndex',
                component: () => import("@/views/Search/SearchIndex.vue"),
                meta: {
                    requiresAuth: false,

                },
            },
            {
                path: "searchresults/:name?",
                name: 'SearchResults',
                component: () => import("@/views/Search/SearchResults"),
                meta: {
                    requiresAuth: false,
                },
            },
        ],

    },
    {
        path: '/myaddress',
        name: 'MyAddress',
        component: () => import("@/views/My/Address/MyAddress.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/addmyaddress',
        name: 'AddMyAddress',
        component: () => import("@/views/My/Address/AddMyAddress.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/editmyaddress',
        name: 'EditMyAddress',
        component: () => import("@/views/My/Address/EditMyAddress.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/myinfo',
        name: 'MyInfo',
        component: () => import("@/views/My/MyInfo.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '/order/:order_item?',
        name: 'Order',
        component: () => import("@/views/Order/Order.vue"),
        meta: { requiresAuth: true }
    },
    // {
    //     path: '/order',
    //     name: 'Order',
    //     component: () => import("@/views/Order.vue"),
    //     meta: { requiresAuth: true }
    // },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login/Login.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/Login/Register.vue"),
        meta: { requiresAuth: false }
    },
    {
        path: '/payment',
        name: 'Payment',
        component: () => import("@/views/Payment.vue"),
        meta: { requiresAuth: false }
    }

]

const router = new VueRouter({
    routes,
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token")
    // 阻止登录状态中进入login页面和register页面
    if (token !== null ) {
        if (to.name == 'Login' || to.name == 'Register') {
            next(false)
        } else {
            next()
        }
    } else {
        // console.log(localStorage.getItem("token") == false)
        if (to.name == 'Order' || to.name == "MyAddress") {
            Vue.prototype.$message({
                content: "您未登录",
                type: "warn",
            }).show();
            setTimeout(() => {
                next({ name: 'Login' })
            }, 1000)
        } else {
            next()
        }
    }
    // 如果用户未能验证身份，则 `next` 会被调用两次
})
export default router