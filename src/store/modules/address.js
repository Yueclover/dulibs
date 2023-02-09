export default {
    // namespaced: true,  //关
    state: {
        myAddress: [],
        selectAddress: {}
    },
    getters: {},
    mutations: {
        setMyAddress(state, myAddress) {
            state.myAddress = myAddress
            // 持久化存储
            localStorage.setItem('myAddress', JSON.stringify(myAddress))
        },
        setSelectAddress(state, playload) {
            state.selectAddress = playload
            // 持久化存储
            localStorage.setItem('selectAddress', JSON.stringify(playload))
        },
        initSelectAddress(state) {
            let myAddress = JSON.parse(localStorage.getItem('myAddress'))
            let selectAddress = JSON.parse(localStorage.getItem('selectAddress'))
            if (myAddress) {
                state.myAddress = myAddress
                if (!selectAddress) {
                    const arr1 = state.myAddress.filter(e => {
                        if (e.status == 1) {
                            return e
                        }
                    })
                    if (arr1.length) {
                        state.selectAddress = arr1[0]
                    } else {
                        state.selectAddress = state.myAddress[0]
                    }
                }else{
                    state.selectAddress = selectAddress
                }
            }
        },
    },
    actions: {

    }
}