const order = {
    state:{
        orderList:[],
    },
    getters:{
        totalPrice(state){
            let totalPrice = 0
            state.orderList.forEach(e => {
                totalPrice +=e.gprice*e.gcount
            });
            return totalPrice
        }
    },
    mutations:{
        setOrderList(state,playload){
            state.orderList = playload
            localStorage.setItem('orderList',JSON.stringify(state.orderList))
        },
        // 
        initOrderList(state){
            const orderList = JSON.parse(localStorage.getItem('orderList'))
            if(orderList){
                state.orderList = orderList

            }else{
                // state.
            }
        }
    }
}
export default order