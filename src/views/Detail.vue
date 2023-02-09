<template>
  <div class="container-detail" @scroll="touchmoveEvent()">
    <div class="layout-header">
      <div class="mod-header-item mod-header">
        <div class="cell-header-item">
          <span class="icon-angle-left" @click="back"></span>
        </div>
        <div class="cell-header-item cell-header-search-input" @click="goSearch">
          <input type="text" placeholder="xxx" />
          <span class="icon-search"></span>
        </div>
        <div class="cell-header-item">
          <span class="icon-share"></span>
        </div>
        <div class="cell-header-item" @click="goCart">
          <span class="icon-shopping-cart"></span>
        </div>
        <div class="cell-header-item">
          <span class="icon-dots-three-horizontal"></span>
        </div>
      </div>
      <div class="mod-header-item mod-menu">
        <div :class="['cell-menu-item', menuIndex === index ? 'menu-actived' : '']" v-for="(item, index) in menu"
          :key="index">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <div class="mod-item mod-goods">
        <div class="sec-mod-img-box">
          <transition-group tag="div" name="img" class="third-mod-img-show">
            <v-touch tag="div" @swipeleft="swiperleft" @swiperight="swiperright" class="cell-img-item"
              v-for="(item, index) in bookImgs" :key="index" v-show="currentIndex === index ? true : false">
              <img :src="item" alt="" />
            </v-touch>
          </transition-group>
          <div class="third-mod-img-shift">
            <div class="cell-img-shift-btn">
              <span>宝贝</span>
              <span>会员</span>
            </div>
            <div class="cell-img-shift-index">
              <span>{{ currentIndex + 1 }}/{{ this.bookImgs.length }}</span>
            </div>
          </div>
        </div>
        <div class="sec-mod-item sec-mod-basic-info">
          <div class="cell-item cell-price">
            <span><i>￥</i>{{ bookInfo.gmprice }}</span>
            <span class="book-price"><i>券后 ￥</i>{{ bookInfo.gprice }}</span>
          </div>
          <div class="cell-item cell-discount">
            <span>会员券后满100-10</span>
            <span>购买得积分</span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-monthly-sales">
            <span>月销 700+</span>
          </div>
          <div class="cell-item cell-title">
            <span>{{ bookInfo.gname }}</span>
          </div>
          <div class="cell-item cell-func">
            <span>推荐</span>
            <span>降价提醒</span>
            <span class="icon-share">分享</span>
          </div>
        </div>
        <div class="sec-mod-item sec-mod-other-parameter">
          <div class="cell-item cell-selection">
            <span>选择</span>
            <span>已选：白色 Max 90W</span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-dilivery">
            <span>发货</span>
            <span><i>发货地 </i><i>快递：免运费</i><br /><i>现货，付款后48小时内发货</i><br /><i>配送至：收货地址</i></span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-protection">
            <span>保障</span>
            <span>
              <i>七天无理由&nbsp;&bull;&nbsp;</i>
              <i>退货运费险&nbsp;&bull;&nbsp;</i>
              <i>假一赔四</i>
            </span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-activity">
            <span>活动</span>
            <span>10元券，当前商品可直接使用</span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-parameter">
            <span>参数</span>
            <span>品牌 型号...</span>
            <span class="icon-angle-right"></span>
          </div>
        </div>
      </div>
      <div class="mod-item mod-comments">
        <div class="sec-mod-item sec-mod-comment">
          <div class="cell-item cell-title">
            <span>宝贝评价(100+)</span>
            <span>查看全部</span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-category">
            <span>是正品(2)</span>
            <span>快递物流很快(2)</span>
            <span>品控很好(2)</span>
          </div>
          <div class="cell-item cell-list">
            <div class="cell-list-item">
              <div class="sec-cell-top">
                <img src="" alt="" />
                <span>匿名买家<br /><i>购买时间</i></span>
              </div>
              <div class="sec-cell-bottom">
                <span>东西很好</span>
              </div>
            </div>
            <div class="cell-list-item">
              <div class="sec-cell-top">
                <img src="" alt="" />
                <span>匿名买家<br /><i>购买时间</i></span>
              </div>
              <div class="sec-cell-bottom">
                <span>东西很好</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sec-mod-item sec-mod-consultation">
          <div class="cell-item cell-title">
            <span>问大家(6)</span>
            <span>查看全部</span>
            <span class="icon-angle-right"></span>
          </div>
          <div class="cell-item cell-list">
            <div class="cell-list-item">
              <img src="#" alt="" />
              <span>是原装吗</span>
              <span>11个回答</span>
            </div>
            <div class="cell-list-item">
              <img src="#" alt="" />
              <span>是原装吗</span>
              <span>11个回答</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mod-item mod-detailpage">
        <div class="cell-item cell-detailpage">
          <span>详情</span>
          <img :src="bookInfo.gdImg" alt="">
        </div>
      </div>
      <div class="mod-item mod-recommend">推荐列表</div>
    </div>
    <div class="layout-tabbar">
      <div class="mod-buy">
        <div class="cell-item cell-shop">
          <span class="icon-shop"></span>
          <span>店铺</span>
        </div>
        <div class="cell-item cell-favorites">
          <span class="icon-heart-o"></span>
          <span>收藏</span>
        </div>
        <div class="cell-item cell-cart" @click="goCart">
          <span class="icon-shopping-cart"></span>
          <span>购物车</span>
        </div>
        <div class="cell-item cell-btn">
          <button class="buy-now" @click="buyNow">立即购买</button>
          <button class="add-cart" @click="addToCart">加入购物车</button>
        </div>
      </div>
      <!-- <buy></buy> -->
    </div>
  </div>
</template>

<script>
import { addGoodsToCart, getGoodsDetailsById } from "@/api/axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      bookInfo: {},
      bookImgs: [],
      currentIndex: 0,
      menu: ["宝贝", "评价", "详情", "推荐"],
      menuIndex: 0,
    };
  },
  components: {},
  computed: {
    ...mapState({
      uid: state => state.user.userInfo.uid,
      token: (state) => state.user.token,
    }),
  },
  methods: {
    ...mapMutations(['setCartList','setOrderList']),
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 搜索
    goSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    swiperleft() {
      if (this.currentIndex == this.bookImgs.length - 1)
        this.currentIndex = 0;
      else this.currentIndex += 1;
    },
    swiperright() {
      if (this.currentIndex == 0)
        this.currentIndex = this.bookImgs.length - 1;
      else this.currentIndex -= 1;
    },
    touchmoveEvent() {
      const ele = document.getElementsByClassName("container-detail")[0];
      const eleHeaderMenu = document.getElementsByClassName("mod-menu")[0];
      if (ele.scrollTop == 0) {
        eleHeaderMenu.style.opacity = 0;
      } else if ((ele.scrollTop > 0) & (ele.scrollTop < 50)) {
        eleHeaderMenu.style.opacity = 0.3;
      } else if ((ele.scrollTop >= 50) & (ele.scrollTop < 100)) {
        eleHeaderMenu.style.opacity = 0.5;
      } else if ((ele.scrollTop >= 100) & (ele.scrollTop < 150)) {
        eleHeaderMenu.style.opacity = 0.7;
      } else if (ele.scrollTop >= 150) {
        eleHeaderMenu.style.opacity = 1;
        if (ele.scrollTop <= 750) {
          this.menuIndex = 0;
        } else if ((ele.scrollTop > 750) & (ele.scrollTop < 1040)) {
          this.menuIndex = 1;
        } else if ((ele.scrollTop > 1040) & (ele.scrollTop < 7000)) {
          this.menuIndex = 2;
        } else {
          this.menuIndex = 3;
        }
      }
      // console.log("clientHeight",ele.clientHeight);
      // console.log("offsetHeight",ele.offsetHeight);
      // console.log("scrollHeight",ele.scrollHeight);
      // console.log("scrollTop",ele.scrollTop);
    },
    goCart() {
      this.$router.push("/cart");
    },
    goOrder() {
      if (this.selectList.length) {
        // this.selectList.forEach(e=>e.checked)
        this.setOrderList(this.selectList);
        this.$router.push({
          path: 'order',
          query: {
            order_item: this.selectList
          }
        });
      } else {
        this.$message({
          content: "请选择",
          type: "err",
        }).show();
      }
    },
    // 立即购买
    buyNow() {
      let orderList = []
      this.bookInfo.gcount = 1
      orderList.push(this.bookInfo)
      this.setOrderList(orderList)
      this.$router.push({
        path: 'order',
        query: {
          order_item: orderList
        }
      });

    },
    // 加入购物车
    // 1.若登录则加入数据库
    addToCart() {
      if (this.token) {
        addGoodsToCart(this.uid, this.$route.query.id, 1).then(
          (res) => {
            let bookeItem = JSON.parse(JSON.stringify(this.bookInfo))
            bookeItem.gcount = 1
            this.setCartList(bookeItem)
            this.$message({
              content: "加入购物车成功",
              type: "success",
            }).show();

          },
          (err) => {
            this.$message({
              content: "加入失败",
              type: "err",
            }).show();
          }
        );
      } else {
        // 2.未登录加入localStorage
        //2.1 cart中是否有数据
        let bookInfo = JSON.parse(JSON.stringify(this.bookInfo));
        bookInfo.gcount = 1;
        let cart = JSON.parse(localStorage.getItem("cartList"));
        // cart中有数据，查询购物车中是否存在该商品
        if (cart) {
          // 购物车中有该商品，原商品gcount+1
          for (var i = 0; i < cart.length; i++) {
            if (cart[i].gid === bookInfo.gid) {
              cart[i].gcount += 1;
              break;
            }
          }
          // 没有该商品，push
          if (i === cart.length) {
            cart.push(bookInfo);
          }
          localStorage.setItem("cartList", JSON.stringify(cart));
        } else {
          //  cart中是无数据
          let cart2 = [];
          cart2.push(bookInfo);
          localStorage.setItem("cartList", JSON.stringify(cart2));
        }
        this.$message({
          content: "加入购物车成功",
          type: "success",
        }).show();
      }
    },
  },
  created() {
    // 从数据库中获取数据，存入vuex中
    getGoodsDetailsById(this.$route.query.id).then((res) => {
      this.bookInfo = res.data.data;
      this.bookImgs = [this.bookInfo.gmainImg, this.bookInfo.gsubImg]
    });
  },
};
</script>

<style lang="scss" scoped>
%display-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}

%font-style {
  font-size: 0.75rem;
  color: #999;
  font-weight: lighter;
}

.container-detail {
  width: 100vw;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }

  .layout-header {
    height: 2.5rem;

    .mod-header {
      padding: 0 1rem;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      height: 2.5rem;
      width: 100%;
      background-color: #fff;

      .cell-header-item {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        color: rgb(133, 133, 133);

        &:last-child {
          margin-right: 0;
        }

        [class^="icon-"] {
          font-size: 1.25rem;
        }
      }

      .cell-header-search-input {
        flex: 1 0 auto;
        position: relative;

        input {
          padding: 0 0.5rem 0 2rem;
          border-radius: 1rem;
          outline: none;
          border: none;
          height: 2rem;
          width: 100%;
          font-size: 1rem;
          background-color: #eee;
          color: rgb(133, 133, 133);
        }

        span {
          margin-top: -0.625rem;
          position: absolute;
          top: 50%;
          left: 0.5rem;
        }
      }
    }

    .mod-menu {
      padding: 0 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: fixed;
      top: 2.5rem;
      left: 0;
      z-index: 1000;
      width: 100%;
      height: 2.5rem;
      background-color: #fff;
      opacity: 0;

      .cell-menu-item {
        padding-bottom: 0.125rem;
        font-size: 1.125rem;
      }

      .menu-actived {
        color: orangered;
        border-bottom: 2px solid orangered;
      }
    }
  }

  .layout-main {
    .mod-item {
      margin-bottom: 0.5rem;
    }

    .mod-goods {
      .sec-mod-img-box {
        .third-mod-img-show {
          position: relative;
          height: 100vw;
          width: 100vw;

          .cell-img-item {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vw;
            background-color: #fff;

            img {
              display: block;
              width: 100%;
              height: auto;
            }
          }
        }

        .third-mod-img-shift {
          padding: 0.5rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          .cell-img-shift-btn {
            display: flex;
            height: 1.5rem;
            border-radius: 0.75rem;
            background-color: #fff;

            span {
              padding: 0 0.5rem;
              height: 1.5rem;
              border-radius: 0.75rem;

              &:first-child {
                color: #fff;
                background-color: orangered;
              }
            }
          }

          .cell-img-shift-index {
            margin-top: -0.625rem;
            padding: 0 0.5rem;
            position: absolute;
            top: 50%;
            right: 0.5rem;
            height: 1.5rem;
            border-radius: 0.75rem;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
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
      }

      .sec-mod-item {
        margin: 0 0.5rem 0.5rem 0.5rem;
        padding: 1rem 0.5rem;
        border-radius: 1rem;
        background-color: #fff;

        &:last-child {
          margin-bottom: 0;
        }

        .cell-item {
          margin-bottom: 0.5rem;

          &:last-child {
            margin-bottom: 0rem;
          }
        }

        &.sec-mod-basic-info {
          .cell-price {
            position: relative;
            height: 2rem;
            font-weight: bold;
            font-size: 1.25rem;
            color: orangered;

            span {
              i {
                font-style: normal;
                font-weight: normal;
                font-size: 0.75rem;
              }

              &.book-price {
                margin-top: -1rem;
                padding: 0 0.5rem;
                display: flex;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 3.75rem;
                border-radius: 1rem;
                background-color: orangered;
                color: #fff;
              }
            }
          }

          .cell-discount {
            position: relative;
            display: flex;

            span {
              margin-right: 0.5rem;
              padding: 0.25rem;
              background-color: rgb(250, 220, 225);
              color: orangered;
              font-size: 0.875rem;

              &:last-child {
                margin: 0;
                margin-top: -0.625rem;
                padding: 0;
                position: absolute;
                top: 50%;
                right: 0;
                font-size: 1.25rem;
                background-color: #fff;
              }
            }
          }

          .cell-monthly-sales {
            display: flex;
            justify-content: flex-end;

            span {
              color: rgb(133, 133, 133);
              font-size: 0.875rem;
            }
          }

          .cell-title {
            font-size: 1.125rem;
            font-weight: bold;
          }

          .cell-func {
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 0.875rem;
            color: rgb(133, 133, 133);
          }
        }

        &.sec-mod-other-parameter {
          .cell-item {
            position: relative;
            display: flex;
            font-size: 0.875rem;

            span {
              &:nth-child(1) {
                flex: 0 0 3.75rem;
                padding-right: 0.5rem;
                color: rgb(133, 133, 133);
              }

              &:nth-child(2) {
                flex: 1 1 auto;
                padding-right: 1rem;
              }

              &:last-child {
                margin: 0;
                margin-top: -0.625rem;
                padding: 0;
                position: absolute;
                top: 50%;
                right: 0;
                font-size: 1.25rem;
                background-color: #fff;
              }
            }
          }

          .cell-dilivery {
            span:nth-child(2) {
              i {
                display: inline-block;
                margin-bottom: 0.25rem;
                padding: 0 0.5rem;

                &:first-child {
                  padding-left: 0;
                  border-right: 1px solid rgb(133, 133, 133);
                }

                &:last-child {
                  margin-bottom: 0;
                  color: rgb(133, 133, 133);
                }
              }
            }
          }
        }
      }
    }

    .mod-comments {
      margin: 0 0.5rem 0.5rem 0.5rem;
      border-radius: 1rem;
      background-color: #fff;

      .sec-mod-item {
        margin: 0 0.5rem;
        padding: 1rem 0.5rem;

        .cell-item {
          margin-bottom: 0.5rem;

          &:last-child {
            margin-bottom: 0;
          }
        }

        .cell-title {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: orangered;

          span {
            &:nth-child(1) {
              font-size: 1rem;
              font-weight: bold;
              color: black;
            }

            &:nth-child(2) {
              padding-right: 1rem;
            }

            &:nth-child(3) {
              margin-top: -0.625rem;
              position: absolute;
              top: 50%;
              right: 0;
              font-size: 1.25rem;
            }
          }
        }
      }

      .sec-mod-comment {
        border-bottom: 1px solid #eee;

        .cell-category {
          display: flex;
          overflow: hidden;

          span {
            margin-right: 0.5rem;
            padding: 0 0.5rem;
            height: 1.25rem;
            border-radius: 0.625rem;
            background-color: pink;
            font-size: 0.875rem;
          }
        }

        .cell-list {
          .cell-list-item {
            margin-bottom: 0.5rem;

            &:last-child {
              margin-bottom: 0;
            }

            .sec-cell-top {
              margin-bottom: 0.5rem;
              display: flex;
              align-items: center;

              img {
                margin-right: 0.5rem;
                height: 2.5rem;
                width: 2.5rem;
                border-radius: 1.25rem;
                background-color: #eee;
              }

              span {
                i {
                  font-size: 0.75rem;
                  color: rgb(133, 133, 133);
                }
              }
            }

            .sec-cell-bottom {
              font-size: 0.875rem;
            }
          }
        }
      }

      .sec-mod-consultation {
        .cell-list {
          margin-bottom: 0.25rem;

          &:last-child {
            margin-bottom: 0;
          }

          .cell-list-item {
            position: relative;
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;

            img {
              margin-top: -0.5rem;
              position: absolute;
              top: 50%;
              left: 0;
              height: 1rem;
              width: 1rem;
              // background-color: orangered;
            }

            span:nth-child(2) {
              padding-left: 1.5rem;
            }

            span:nth-child(3) {
              color: rgb(133, 133, 133);
            }
          }
        }
      }
    }

    .mod-detailpage {
      // height: 900px;
      background-color: #fff;

      .cell-detailpage {
        padding: 1rem 1rem;
        display: flex;
        flex-direction: column;

        span {
          margin-bottom: .5rem;
          padding-left: .5rem;
          border-left: 1px solid #222;
        }

        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .mod-recommend {
      height: 500px;
    }
  }

  .layout-tabbar {
    .mod-buy {
      padding: 0.625rem 0;
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 4.375rem;
      border-top-right-radius: 0.625rem;
      border-top-left-radius: 0.625rem;
      background-color: #fff;

      .cell-item {
        padding: 0 0.625rem;
      }

      .cell-shop,
      .cell-favorites,
      .cell-cart {
        @extend %display-flex;
        flex-shrink: 0;

        span:nth-child(1) {
          font-size: 1.875rem;
        }

        span:nth-child(2) {
          @extend %font-style;
        }
      }

      .cell-btn {
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;

        button {
          padding: 0.625rem 1rem;
          color: #fff;
          font-size: 0.875rem;
          border-radius: 1.5625rem;
        }

        .buy-now {
          background-color: orange;
        }

        .add-cart {
          background-color: red;
        }
      }
    }
  }
}
</style>