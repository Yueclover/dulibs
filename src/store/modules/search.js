const search = {
    state:{
        searchHistory:[],
    },
    mutations:{
        setSearchHistory(state,playload){
            state.searchHistory.push(playload)
            // 去重
            state.searchHistory = Array.from(new Set(state.searchHistory))
            // localStorage
            localStorage.setItem('searchHistory',JSON.stringify(state.searchHistory))
        },
        // 删除历史记录
        deleteSearchHistory(state){
            state.searchHistory = []
            localStorage.removeItem('searchHistory')
        },
        initSearchHistory(state){
            const searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
            if(searchHistory){
                state.searchHistory = searchHistory
            }
        }
    },
}
export default search