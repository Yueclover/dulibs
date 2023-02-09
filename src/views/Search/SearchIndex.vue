<template>
  <div class="search-index">
    <div class="mod-list mod-search-history" v-show="searchHistory.length">
      <div class="cell-search-history-title">
        <span>搜索历史</span>
        <span class="icon-trash-o" @click="deleteSAllHistory"></span>
      </div>
      <div class="cell-search-history-list">
        <span v-for="(item, index) in searchHistory" :key="index" @click="addToSearch(item)">{{
          item
        }}</span>
      </div>
    </div>
    <div class="mod-list mod-search-hot">
      <div class="cell-search-hot-title">
        <span>热门搜索</span>
        <span class="icon-eye" @click="showHotList" v-if="isshow"></span>
        <span class="icon-eye-hidden" @click="showHotList" v-else></span>
      </div>
      <div class="cell-search-hot-list" v-show="isshow">
        <span v-for="(item,index) in hotList" :key="index" @click="addToSearch(item)">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "SearchIndex",
  data() {
    return {
      isshow:true,
      searchValue: "",
      placeholderValue: "三体",
      hotList:[
        '过大年立体书',
        '通俗小说',
        '过大年立体书',
        '铅笔俱乐部',
        '过大年立体书',
        '铅笔俱乐部',
      ]
    };
  },
  computed: {
    ...mapState({
      searchHistory: (state) => state.search.searchHistory,
    }),
  },
  methods: {
    ...mapMutations(["setSearchHistory", "deleteSearchHistory",'setSearchValue']),
    //删除所有搜索历史
    deleteSAllHistory() {
      this.deleteSearchHistory();
    },
    addToSearch(item){
      this.$bus.$emit('addToSearch',item)
    },
    showHotList(){
      this.isshow = !this.isshow
    }
  },
};
</script>

<style scoped lang="scss">
// .container-search {
//   padding: 0 1rem;
//   height: 100vh;
//   width: 100vw;
//   overflow-y: auto;
//   overflow-x: hidden;
//   background-color: #fff;
//   &::-webkit-scrollbar {
//     display: none;
//   }
//   .layout-header {
//     .mod-header {
//       height: 2.5rem;
//       .cell-header {
//         position: fixed;
//         top: 0;
//         left: 0;
//         padding: 0 1rem;
//         display: flex;
//         align-items: center;
//         height: 2.5rem;
//         font-size: 1.125rem;
//         [class^="icon-"] {
//           font-size: 1.75rem;
//         }
//         span {
//           margin-right: 0.5rem;
//           &:last-child {
//             margin-right: 0;
//           }
//         }
//       }
//     }
//     .mod-search-input {
//       margin-bottom: 1rem;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       .cell-search-input-bar {
//         position: relative;
//         margin-right: 0.5rem;
//         flex: 1 1 90%;
//         input {
//           padding: 2px 0.5rem;
//           padding-left: 2rem;
//           line-height: 1.5rem;
//           width: 100%;
//           outline: none;
//           border: none;
//           border-radius: 0.75rem;
//           background-color: #eee;
//         }
//         span {
//           margin-top: -0.5rem;
//           position: absolute;
//           top: 50%;
//           left: 0.5rem;
//           font-size: 1rem;
//           color: rgb(133, 133, 133);
//         }
//       }
//       .cell-cannel-search {
//         flex: 0 0 auto;
//         // line-height: 1.75rem;
//       }
//     }
//   }
//   .layout-main {
//     .mod-list {
//       div:nth-child(1) {
//         display: flex;
//         height: 1.875rem;
//         align-items: center;
//         position: relative;
//         span:nth-child(1) {
//           font-weight: bold;
//         }
//         [class^="icon-"] {
//           margin-top: -0.625rem;
//           position: absolute;
//           top: 50%;
//           right: 0;
//           font-size: 1.25rem;
//           color: rgb(133, 133, 133);
//         }
//       }
//       div:nth-child(2) {
//         padding: 0.5rem 0;
//         display: flex;
//         flex-wrap: wrap;
//         max-height: 12.5rem;
//         overflow: auto;
//         span {
//           padding: 0 0.5rem;
//           margin: 0 0.5rem 1rem 0;
//           line-height: 1.25rem;
//           border-radius: 0.625rem;
//           background-color: #eee;
//           font-size: 0.875rem;
//           color: rgb(133, 133, 133);
//         }
//       }
//     }
//     .mod-search-history {
//     }
//     .mod-search-hot {
//     }
//   }
// }
.search-index {
  .mod-list {
    div:nth-child(1) {
      display: flex;
      height: 1.875rem;
      align-items: center;
      position: relative;
      span:nth-child(1) {
        font-weight: bold;
      }
      [class^="icon-"] {
        margin-top: -0.625rem;
        position: absolute;
        top: 50%;
        right: 0;
        font-size: 1.25rem;
        color: rgb(133, 133, 133);
      }
    }
    div:nth-child(2) {
      padding: 0.5rem 0;
      display: flex;
      flex-wrap: wrap;
      max-height: 12.5rem;
      overflow: auto;
      span {
        padding: 0 0.5rem;
        margin: 0 0.5rem 1rem 0;
        line-height: 1.25rem;
        border-radius: 0.625rem;
        background-color: #eee;
        font-size: 0.875rem;
        color: rgb(133, 133, 133);
      }
    }
  }
  .mod-search-history {
  }
  .mod-search-hot {
  }
}
</style>