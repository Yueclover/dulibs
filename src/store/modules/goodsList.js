const goodsList = {
    state(){
        return {
            pageType:'',
            lyTab:{},
            recomends:{},
            likes:{},
            swipers:{},
            detail:{}
                // title:'',
                // des:'',
                // price:'',
                // imgUrl:'',
            
        }
    },
    getters:{
        swiperImg(state){
            return state.swipers
        },
        goodsList(state){
            return state.lyTabs
        },
        recomendList(state){
            return state.recomends
        },
        likeList(state){
            return state.likes
        }
    },
    mutations:{
        setDetail(state,playload){
            state.detail = playload
        },
        setPageType(state,playload){
            state.pageType = playload
        },
        setLyTab(state,playload){
            state.lyTab = playload
        },
        setSwipers(state,playload){
            state.swipers = playload
        },
        setRecomends(state,playload){
            state.recomends = playload
        },
        setLikes(state,playload){
            state.likes = playload
        },
        // setSeniorHigh(state,playload){
        //     state.seniorHigh = playload
        // },
    },
    actions:{},
}
export default goodsList