import Vue from "vue";

const cartList = {
    state() {
        return {
            cartList: [],//存储购物车数据
            selectList: []//存储被选中的购物车数据
        }
    },
    getters: {
        lenCompaire(state) {
            // console.log(state.selectList == state.cartList);
            return state.selectList.length === state.cartList.length
        },
        allPrice(state) {
            let total = {
                price: 0,
                count: 0,
            }
            state.cartList.forEach(e => {
                if (e.checked) {
                    total.count += e.gcount
                    total.price += e.gcount * e.gprice
                }
            })
            return total
        }
    },
    mutations: {
        setCartList(state, playload) {
            // 若playload为数组，则替换现有cartList
            if (Array.isArray(playload)) {
                state.cartList = playload
                state.cartList.forEach(e => {
                    Vue.set(e, 'checked', false)
                })
            }else{
                // 为对象，则push进cartList
                Vue.set(playload, 'checked', false)
                state.cartList.push(playload)
            }
            localStorage.setItem('cartList', JSON.stringify(state.cartList))
        },
        setSelectList(state, playload) {
            state.selectList = playload
        },
        initCartList(state) {
            if (localStorage.getItem('cartList') !== null) {
                state.cartList = JSON.parse(localStorage.getItem('cartList'))
            }else{
                state.cartList = []
            }
        },
        // 全选
        checkAll(state) {
            state.cartList.map(e => {
                e.checked = true
            })
            state.selectList = state.cartList
        },
        // checkAll(state) {
        //     if (state.selectList === state.cartList) {
        //         state.selectList = []
        //     } else {
        //         state.selectList = state.cartList
        //     }
        // },
        // 全不选
        unCheckAll(state) {
            state.cartList.map(e => {
                e.checked = false
            })
            state.selectList = []
        },
        // 单选
        checkOne(state, playload) {
            let index = state.selectList.indexOf(playload)
            // selectList中已存在，即被选中的
            if (index >= 0) {
                // 删掉selctList中该商品,即取消选中
                state.selectList = state.selectList.filter((e,i)=>{
                    return i !== index
                })
                // state.selectList.splice(index, 1)
            } else {
                // selectList中不存在，即没有被选中的
                // 将该商品的gid添加到selctList中
                state.selectList.push(playload)
            }
        },
        // updateCount
        updateItemCount(state, playload) {
            state.cartList.forEach(e => {
                if (e === playload.item) {
                    e.checked = true
                    // 去重
                    if (state.selectList.indexOf(playload.item) < 0) {
                        state.selectList.push(playload.item)
                    }
                    e.gcount += playload.count
                }
            })
            localStorage.setItem("cartList", JSON.stringify(state.cartList))
        },
        // 删除商品
        deleteItem(state, playload) {
            // 删除购物车中商品
            state.cartList = state.cartList.filter(e => {
                return e.gid !== playload.gid
            })
            state.selectList = state.selectList.filter(e => {
                return e.gid !== playload.gid
            })
            localStorage.setItem("cartList", JSON.stringify(state.cartList))
        },

    },
    actions: {
        selectAllBtn({ commit, getters }) {
            // cartList 与selectList长度相同时  触发checkAll 否则 触发UnCheckall
            getters.lenCompaire ? commit('unCheckAll') : commit("checkAll")
        },

    },
}
export default cartList