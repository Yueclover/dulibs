<template>
  <div class="container-category">
    <div class="layout-main">
      <div class="mod-aside">
        <div class="cell-item" v-for="(item, index) in  categories" :key="index" @click="selectSecTitle(item.id)">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="mod-main">
        <div class="cell-second-category-item" v-for="(item1, index1) in currentSecondTitle" :key="index1">
          <div class="sec-cell-item cell-title"><span>{{ item1.name }}</span></div>
          <div class="sec-cell-item  cell-books">
            <div class="cell-book" v-for="(item2, index2) in item1.currentBooks" :key="index2">
              <img :src="item2.mainImg" alt="">
              <span>{{ item2.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-tabbar">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
export default {
  name: 'Caregory',
  components: {
    Tabbar,
  },
  data() {
    return {
      categories: [
        {
          id: '001',
          name: '一级分类',
        },
        {
          id: '001',
          name: '分类一'
        },
        {
          id: '001',
          name: '分类一'
        },
        {
          id: '001',
          name: '分类一'
        },
        {
          id: '001',
          name: '分类一'
        },
        {
          id: '001',
          name: '分类一'
        },
       
        {
          id: '001',
          name: '分类一'
        },
        {
          id: '001',
          name: '分类一'
        },
      ],
      currentSecondTitle: [
        {
          id: '011',
          name: '二级分类',
          currentBooks: [
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
          ]
        },
        {
          id: '011',
          name: '二级分类',
          currentBooks: [
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
          ]
        },
        {
          id: '011',
          name: '二级分类',
          currentBooks: [
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
          ]
        },
        {
          id: '011',
          name: '二级分类',
          currentBooks: [
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
            {
              id: 'b01',
              name: '红与黑',
              mainImg: '',
            },
          ]
        },
      ],
    }
  },
  methods: {
    selectSecTitle(id) {
      console.log("发送了" + id);
    }
  }
}
</script>

<style scoped lang="scss">
.container-category {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #eee;

  .layout-main {
    display: flex;
    width: 100%;

    .mod-aside {
      margin-right: 1rem;
      flex: 0 0 6.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: calc(100vh - 3.125rem);
      overflow: auto;
      background-color: #fff;
      &::-webkit-scrollbar{
        width: 0;
        height: 0;
      }
      .cell-item{
        padding:2rem 0;
      }
    }

    .mod-main {
      flex: 1 1 6.25rem;
      height: calc(100vh - 3.125rem);
      overflow: auto;
      background-color: #fff;
      &::-webkit-scrollbar{
        width: 0;
        height: 0;
      }
      .cell-second-category-item {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solod #eee;

        &:last-of-type {
          border: none;
        }
        .cell-title{
          padding:1rem;
          font-size: 1.25rem;
          font-weight: bold;
        }
        .cell-books {
          // 三等分
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
          .cell-book {
            margin-right:.5rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            max-width: calc((100% - .5rem * 2)/3);
            min-width: calc((100% - .5rem * 2)/3);
            &:last-of-type{
              margin-right:0;
            }
            img {
              margin-bottom: .5rem;
              height: 2.5rem;
              width: auto;
            }
          }
        }
      }
    }
  }
}
</style>