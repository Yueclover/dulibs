<template>
  <div class="search-list">
    <div class="mod-sort">
      <div class="cell-item" v-for="(item, index) in sortTypes" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="mod-search-lists">
      <div
        class="cell-item"
        v-for="(item, index) in recommend"
        :key="index"
        @click="goDetail(item)"
      >
        <div class="left"><img :src="item.imgUrl" alt="" /></div>
        <div class="right">
          <span class="goods-title"
            >{{ item.gname }}{{ item.description }}</span
          >
          <span class="goods-price"><i>￥</i>{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  data() {
    return {
      sortTypes: ["默认", "销量", "价格", "评论量", "最新"],
      defaultValue: "",
      recommend: [
        {
          id: 1,
          imgUrl: "http://localhost:8081/images/recomend1.jpg",
          title: "高考真题解密 英语",
          description:
            " 金太阳教育 卷霸2023版高考真题英语全国卷2018-2022汇编高中高三近5五年历年试卷试题 ",
          price: 68,
        },
        {
          id: 2,
          imgUrl: "http://localhost:8081/images/recomend2.jpg",
          title: "高考真题解密 文综",
          description:
            " 金太阳教育 卷霸2023版高考真题文综全国卷2018-2022汇编高中高三近5五年历年试卷试题 ",
          price: 68,
        },
        {
          id: 3,
          imgUrl: "http://localhost:8081/images/recomend3.jpg",
          title: "高考真题解密 理综",
          description:
            " 金太阳教育 卷霸2023版高考真题理综全国卷2018-2022汇编高中高三近5五年历年试卷试题 ",
          price: 68,
        },
        {
          id: 4,
          imgUrl: "http://localhost:8081/images/recomend4.jpg",
          title: "肖秀荣考研政治 1000题",
          description: "肖秀荣2023考研政治，现货速发",
          price: 41,
        },
        {
          id: 5,
          imgUrl: "http://localhost:8081/images/recomend5.jpg",
          title: "线性代数辅导讲义",
          description: "养成学习好习惯，进步不会慢",
          price: 23.3,
        },
        {
          id: 6,
          imgUrl: "http://localhost:8081/images/recomend6.jpg",
          title: " 2023王道计算机考研408教材 ",
          description:
            "本书特色 提供14年来考研的真题。 提供对应的双色答题卡。 提供配套答案与分析。 本书包含以下模拟题（内附答题卡和参考答案） 2022年全国硕士研究生招生考试计算机科学专业基础试题 2021年全国硕士研究生招生考试计算机科学专业基础试题 2020年全国硕士研究生招生考试计算机科学专业基础试题 2019年全国硕士研究生招生考试计算机科学专业基础试题 2018年全国硕士研究生招生考试计算机科学专业基础试题 2017年全国硕士研究生招生考试计算机科学专业基础试题 2016年全国硕士研究生招生考试计算机科学专业基础试题 2015年全国硕士研究生招生考试计算机科学专业基础试题 2014年全国硕士研究生招生考试计算机科学专业基础试题 2013年全国硕士研究生招生考试计算机科学专业基础试题 2012年全国硕士研究生招生考试计算机科学专业基础试题 2011年全国",
          price: 68,
        },
      ],
    };
  },
  components: {
    // Header,
    // Recomend,
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: "/detail",
        query: {
          id: item.id,
        },
      });
    },
    // 自定义事件的处理函数
    // getSearchList(value = {}, defaultValue) {
    //   this.defaultValue = defaultValue;
    //   this.recomend = value;
    // },
    backSearchPage() {
      this.$router.push({
        name: "Search",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.search-list {
  .mod-sort {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    .cell-item {
      // flex:;
      max-width: calc(100% / 5);
      min-width: calc(100% / 5);
      text-align: center;
    }
  }
  .mod-search-lists {
    display: flex;
    flex-direction: column;
    .cell-item {
      margin: 0.5rem 0;
      display: flex;
      border-radius: 1rem;
      background-color: #fff;
      .left {
        img {
          display: block;
          border-radius: 1rem;
          height: 9.375rem9.375rem;
          width: 9.375rem;
        }
      }
      .right {
        padding: 0 0 1rem 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span:nth-child(1) {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-weight: bold;
        }
        span:nth-child(2) {
          font-size: 1.25rem;
          font-weight: bold;
          color: orangered;
          i {
            font-size: 0.75rem;
          }
        }
      }
    }
  }
}
</style>