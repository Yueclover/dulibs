<template>
  <div class="container-search">
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-header">
          <span class="icon-angle-left" @click="goback"></span>
          <span>搜索</span>
        </div>
      </div>
      <div class="mod-search-input">
        <div class="cell-search-input-bar">
          <input
            type="text"
            :placeholder="placeholderValue"
            v-model="searchValue"
            @keyup.enter="searchBook"
          />
          <span class="icon-search" @click="searchBook"></span>
        </div>
        <div class="cell-cannel-search" @click="goback">
          <span v-show="true">取消</span>
        </div>
      </div>
    </div>
    <div class="layout-main">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchValue: "",
      placeholderValue: "三体",
    };
  },
  computed:{
    ...mapState({
      // searchValue:state=>state.search.searchValue
    })
  },
  methods: {
    ...mapMutations(["setSearchHistory", "deleteSearchHistory"]),
    goback() {
      this.$router.go(-1);
    },
    searchBook() {
      if (this.searchValue) {
        // 跳转路由
        this.$router.push({
          name:'SearchResults',
          query:{
            name:this.searchValue
          }
        })
        // 添加历史记录
        this.setSearchHistory(this.searchValue);
        console.log("searchBook被触发了");
      } else {
        this.$router.push({
          name:'SearchResults',
          query:{
            name:this.placeholderValue
          }
        })
        this.setSearchHistory(this.placeholderValue);
        console.log("placeHolder被触发了");
         
      }
    },
    addToSearchInput(item){
      this.searchValue = item
      this.searchBook()
    }
  },
  created(){
    this.$bus.$on('addToSearch',this.addToSearchInput)
  }
};
</script>

<style scoped lang="scss">
.container-search {
  padding: 0 1rem;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  .layout-header {
    height: 5rem;
    .mod-header {
      height: 2.5rem;
      .cell-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        height: 2.5rem;
        font-size: 1.125rem;
        [class^="icon-"] {
          font-size: 1.75rem;
        }
        span {
          margin-right: 0.5rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .mod-search-input {
      margin-bottom: 1rem;
      padding: 0 1rem;
      position:fixed;
      top:2.5rem;
      left:0;
       z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .cell-search-input-bar {
        position: relative;
        margin-right: 0.5rem;
        flex: 1 1 90%;
        input {
          padding: 2px 0.5rem;
          padding-left: 2rem;
          line-height: 1.5rem;
          width: 100%;
          outline: none;
          border: none;
          border-radius: 0.75rem;
          background-color: #eee;
        }
        span {
          margin-top: -0.5rem;
          position: absolute;
          top: 50%;
          left: 0.5rem;
          font-size: 1rem;
          color: rgb(133, 133, 133);
        }
      }
      .cell-cannel-search {
        flex: 0 0 auto;
      }
    }
  }
  .layout-main{
    overflow: auto;
    height: calc(100vh - 5rem);
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
  }
}
</style>