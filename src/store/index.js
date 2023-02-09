import Vue from 'vue'
import Vuex from 'vuex'
import goodsList from '@/store/modules/goodsList'
import cartList from '@/store/modules/cartList'
import user from '@/store/modules/user'
import address from "@/store/modules/address"
import order from "@/store/modules/order"
import search from "@/store/modules/search"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        goodsList,
        cartList,
        user,
        address,
        order,
        search,
    },
    state:{},
})
export default store