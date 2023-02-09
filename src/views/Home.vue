<template>
  <div class="container-home">
    <div class="layout-header">
      <div class="mod-header">
        <div class="mod-header-brand">
          <div class="cell-logo">
            <span>读立书店</span>
          </div>
        </div>
        <div class="mod-header-search">
          <div class="cell-search-bar">
            <input type="text" placeholder="搜您感兴趣的书" @click="goSearch" />
            <span class="icon-search"></span>
          </div>
          <div class="cell-customer">
            <span class="icon-headset_mic"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <!-- 轮播图 -->
      <div class="mod-carousel-maps">
        <transition-group tag="div" name="img" class="mod-carousel-pics">
          <div class="cell-carousel-picitem" v-for="(item, index) in carouselPicUrl" :key="index"
            v-show="currentIndex === index ? true : false">
            <img :src="item" alt="" />
          </div>
        </transition-group>
        <!-- 轮播图导航点 -->
        <div class="mod-carousel-dots">
          <div class="cell-carousel-dotitem" v-for="(item, index) in carouselPicUrl" :key="index"
            :class="currentIndex === index ? 'dot-active-style' : ''"></div>
        </div>
      </div>
      <!-- 菜单 -->
      <div class="mod-menu">
        <div class="cell-menu-item" v-for="(item, index) in menu" :key="index">
          <span :class="item.className"></span>
          <span>{{ item.title }}</span>
        </div>
      </div>
      <!-- 热门和最新书籍 -->
      <div class="mod-ad">
        <!-- 最热 -->
        <div class="mod-ad-hotest">
          <div class="mod-ad-hotest-title"><span>图书畅销榜</span></div>
          <div class="mod-ad-hotest-books">
            <div class="cell-ad-hotest-item">
              <img src="@/assets/images/hot1.jpg" alt="" />
              <span>被讨厌的勇气</span>
            </div>
            <div class="cell-ad-hotest-item">
              <img src="@/assets/images/hot2.jpg" alt="" />
              <span>蛤蟆先生去看心理医生</span>
            </div>
          </div>
        </div>
        <!-- 最新 -->
        <div class="mod-ad-latest">
          <div class="mod-ad-latest-title"><span>新书上架</span></div>
          <div class="mod-ad-latest-books">
            <div class="cell-ad-latest-item">
              <img src="@/assets/images/hot1.jpg" alt="" />
              <span>被讨厌的勇气</span>
            </div>
            <div class="cell-ad-latest-item">
              <img src="@/assets/images/hot2.jpg" alt="" />
              <span>长安的荔枝</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 热门推荐|| 登录状态下存在猜你喜欢模块 -->
      <div class="mod-recommend-show">
        <div class="mod-recommend-title">
          <div class="cell-recommend-title" @click="changeModule('recommend')"><span
              :class="moduleName === 'recommend' ? 'ischecked' : ''">热门推荐</span></div>
          <div class="cell-recommend-title" @click="changeModule('hot')" v-if="token"><span
              :class="moduleName === 'hot' ? 'ischecked' : ''">猜你喜欢</span></div>
        </div>
        <div class="mod-recommend-booklist">
          <!-- 瀑布流布局 -->
          <div class="mod-recommend-column">
            <div class="cell-recommend-item" v-for="(item, index) in recommend" :key="index"
              @click="goToDetailPage(item.id)">
              <img :src="item.imgUrl" alt="" />
              <span>{{ item.description }}</span>
            </div>
          </div>
          <div class="mod-recommend-column">
            <div class="cell-recommend-item" v-for="(item, index) in like" :key="index"
              @click="goToDetailPage(item.id)">
              <img :src="item.imgUrl" alt="" />
              <span>{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-footer">这是footer</div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import { mapState } from 'vuex';
export default {
  name: "Home",
  components: {
    Tabbar,
  },
  computed:{
   ...mapState({
    token:state=>state.user.token
   })
  },
  data() {
    return {
      moduleName: 'recommend',
      timer: null, //定时器
      currentIndex: 0,
      carouselPicUrl: [
        require("@/assets/images/carouselmaps/carouselitem1.jpg"),
        require("@/assets/images/carouselmaps/carouselitem2.jpg"),
        require("@/assets/images/carouselmaps/carouselitem3.jpg"),
        require("@/assets/images/carouselmaps/carouselitem4.jpg"),
        require("@/assets/images/carouselmaps/carouselitem5.jpg"),
      ],
      menu: [
        {
          title: "新高考",
          className: "icon-graduation-cap",
        },
        {
          title: "考研",
          className: "icon-library",
        },
        {
          title: "文具",
          className: "icon-ruler",
        },
        {
          title: "领福利",
          className: "icon-gift",
        },
        {
          title: "电子书",
          className: "icon-file-archive-o",
        },
      ],
      // recommend:[],
      // like:[]
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
      like: [
        {
          id: 1,
          imgUrl: "http://localhost:8081/images/like1.jpg",
          title: " 雅思王听力真题语料库 2022新版 ",
          description: "思王听力真题语",
          price: 68,
        },
        {
          id: 2,
          imgUrl: "http://localhost:8081/images/like2.jpg",
          title: " 新东方 100个句子记完7000个雅思单词",
          description:
            " 本书是俞敏洪老师的又一词汇力作，书中收录雅思考试中的100个典型句子，通过对其中核心词、主题归纳词及重要语法点的讲解，帮助考生用句子识记单词，用语境强化记忆，有效解决词汇难题。 每个句子下面都深度分析了该句的语法结构，帮助考生掌握雅思考查的语法难点。本书为四色印刷，配有100余张全彩配图，记忆单词不再枯燥。本书还配有由外教朗读的音频，纯正英音，扫描封底二维码或登录网址即可下载收听，随听随学。另外，新东方4位雅思老师全力助阵，录制全书配套课程，线上与线下学习完美结合，扫描封底二维码即可购课学习。 ",
          price: 68,
        },
        {
          id: 3,
          imgUrl: "http://localhost:8081/images/like3.jpg",
          title:
            " 顾家北手把手教你雅思写作 6.0版 领跑雅思IELTS写作 技法大全 雅思备考经典",
          description:
            "6.0版本是之前所有版本的升华和提炼，书中所讲述的教学体系，在目前在全球雅思行业备受推崇，写作教学口碑一致好评、提分幅度大、速度快，水平遥遥领先。本书通过手把手讲述写作技巧，细致、深入，符合中国学生的学习习惯；本书精选典型题目，深入解析剑桥题库，紧扣评分标准，准确把握考官评判心理；引领考试风向标；提供适合学生学习的高水平范文，强调语言能力，快速提分。 本书设计巧妙，学习手册和练习手册并行，大书学习知识点，小书及时复习巩固。确保学习任务完成。书中所附赠二维码，可以随时补充考试动态，并获得本书配套音频。 ",
          price: 68,
        },
        {
          id: 4,
          imgUrl: "http://localhost:8081/images/like4.jpg",
          title: " 新东方 剑桥雅思语法精讲精练",
          description:
            " 命题方官方出品，覆盖雅思考试常考语法点，搭配巩固练习，诊断语法错误，为考生量身定制的雅思制胜用书！ ",
          price: 68,
        },
        {
          id: 5,
          imgUrl: "http://localhost:8081/images/like5.jpg",
          title: " 新东方 雅思词汇词根+联想记忆法 ",
          description:
            "乱序版 俞敏洪 雅思乱序 新东方绿宝书 新东方雅思乱序全新改版，收录雅思核心词，新增配套词汇课程、影视剧场景、背词小程序，“词根+联想”高效助记。 ",
          price: 68,
        },
      ],
    };
  },
  methods: {
    goSearch() {
      this.$router.push({
        path: '/search'
      });
    },
    changeModule(moduleName) {
      this.moduleName = moduleName
    },
    // carousel
    setCarousel() {
      setInterval(() => {
        if (this.currentIndex >= this.carouselPicUrl.length - 1)
          this.currentIndex = 0;
        else this.currentIndex++;
      }, 3000);
    },
    // 跳转详情页,使用路由传参
    goToDetailPage(id) {
      this.$router.push({
        name: 'Detail',
        query: {
          id
        }
      })
    }
  },
  mounted() {
    this.timer = this.setCarousel();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped lang="scss">
.container-home {
  height: 100vh;
  width: 100vw;

  .layout-header {
    height: 5.625rem;

    .mod-header {
      padding: 0 1rem;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 5.625rem;
      width: 100%;
      background-color: #fff;

      .mod-header-brand {
        line-height: 2.5rem;
        font-size: 1.25rem;
        text-align: center;
      }

      .mod-header-search {
        height: 3.125rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .cell-search-bar {
          margin-right: 1rem;
          position: relative;
          flex: 1 1 90%;

          input {
            padding-left: 0.5rem;
            padding-right: 1.7rem;
            outline: none;
            border: none;
            border-radius: 1.125rem;
            background-color: #eee;
            width: 100%;
            line-height: 2.5rem;
            font-size: 1rem;
          }

          span {
            margin-top: -0.625rem;
            position: absolute;
            top: 50%;
            right: 0.5rem;
            font-size: 1.25rem;
          }
        }

        .cell-customer {
          flex: 0 0 auto;
          font-size: 2rem;
          color: chocolate;
        }
      }
    }
  }

  .layout-main {
    .mod-carousel-maps {
      padding: 0;
      position: relative;

      .mod-carousel-pics {
        position: relative;
        display: flex;
        height: calc(100vw / 3.84);
        overflow: hidden;

        .cell-carousel-picitem {
          flex: 0 0 100%;
          position: absolute;
          top: 0;
          left: 0;

          img {
            display: block;
            width: 100%;
            height: auto;
          }
        }
      }

      .img-enter {
        transform: translateX(100%);
      }

      .img-leave-to {
        transform: translateX(-100%);
      }

      .img-leave-active,
      .img-enter-active {
        transition: transform 1s ease;
      }

      .mod-carousel-dots {
        margin-left: -2.5rem;
        display: flex;
        position: absolute;
        bottom: 0.5rem;
        left: 50%;

        .cell-carousel-dotitem {
          margin-right: 0.5rem;
          height: 0.5em;
          width: 0.5rem;
          border-radius: 0.25rem;
          background-color: #fff;
          //   background-color: rgba(238, 238, 238, 0.3);
        }

        .dot-active-style {
          background-color: chocolate;
        }
      }
    }

    .mod-menu {
      padding: 0.5rem 1rem;
      display: flex;
      background-color: #fff;

      .cell-menu-item {
        flex: 1 1 auto;
        margin-right: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        max-width: calc((100% - 4 * 1rem) / 5);
        min-width: calc((100% - 4 * 1rem) / 5);

        &:last-child {
          margin-right: 0;
        }

        span:nth-child(1) {
          font-size: 2.5rem;
          color: chocolate;
        }
      }
    }

    .mod-ad {
      padding: 0.5rem 1rem;
      display: flex;

      .mod-ad-hotest,
      .mod-ad-latest {
        width: 50%;

        // .mod-ad-hotest/latest-title
        &>div:nth-child(1) {
          padding-left: 0.5rem;
          line-height: 2rem;
          font-size: 1.125rem;
          font-weight: bold;
          background-image: linear-gradient(#fe988a, #fff);
        }

        .mod-ad-hotest-title {
          border-top-left-radius: 1rem;
        }

        .mod-ad-latest-title {
          border-top-right-radius: 1rem;
        }

        // .mod-ad-hotest/latest-books
        &>div:nth-child(2) {
          display: flex;
          width: 100%;
          background-color: #fff;

          //   cell-ad-hotest/latest-item
          &>div {
            display: flex;
            flex-direction: column;
            width: 50%;

            img {
              width: 100%;
              height: auto;
            }

            span {
              padding: 0.5rem;
              padding-right: 0;
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .mod-ad-hotest-books {
          border-bottom-left-radius: 1rem;
        }

        .mod-ad-latest-books {
          border-bottom-right-radius: 1rem;
        }
      }
    }

    .mod-recommend-show {
      padding: 1rem;

      .mod-recommend-title {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        .cell-recommend-title {
          flex:1 1 auto;
          margin-right: 1rem;

          &:last-child {
            margin-right: 0;
          }

          // max-width: calc((100% - 1rem) / 2);
          // min-width: calc((100% - 1rem) / 2);
          text-align: center;
          font-size: 1.25rem;
          span.ischecked {
            color: orangered;
            font-weight: bold;
            font-size: 1.5rem;
          }
        }
      }

      //   瀑布流布局
      .mod-recommend-booklist {
        display: flex;
        align-items: flex-start;

        .mod-recommend-column {
          margin-right: 1rem;
          display: flex;
          flex-direction: column;

          &:last-child {
            margin-right: 0;
          }

          max-width: calc((100% - 1rem) / 2);
          min-width: calc((100% - 1rem) / 2);

          .cell-recommend-item {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            border-radius: 1rem;
            background-color: #fff;

            img {
              margin-bottom: 0.5rem;
              // padding-bottom: 100%;
              width: 100%;
              height: auto;
              border-top-right-radius: 1rem;
              border-top-left-radius: 1rem;
            }

            span {
              margin-bottom: 0.5rem;
              padding: 0 0.5rem;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }

  .layout-footer {
    margin-bottom: 3.125rem;
  }
}
</style>