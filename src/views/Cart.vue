<template>
  <div class="container-cart" @scroll.prevent>
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-header">
          <span class="icon-angle-left" @click="goback"></span>
          <span>购物车</span>
        </div>
      </div>
      <div class="mod-operate" v-show="cartList.length">
        <div class="cell-item">
          <span>定位</span>
          <span @click="edit" v-if="editbtn">编辑商品</span>
          <span @click="edit" v-else>完成</span>
        </div>
      </div>
    </div>
    <div class="layout-main" v-if="cartList.length">
      <div class="mod-cartlist">
        <div class="sec-mod-item" v-for="(item, index) in cartList" :key="index">
          <div class="checkbox cell-checkbox">
            <input type="checkbox" @click="checkOne(item)" v-model="item.checked" />
          </div>
          <div class="cell-cart-info">
            <div class="discount">
              <span><i>满减额</i> 购满100元，可减50元</span>
              <span>去凑单<span class="icon-angle-right"></span></span>
            </div>
            <div class="goods-info-box">
              <img :src="item.gmainImg" alt="" />
              <div class="goods-info">
                <div class="title">{{ item.gname }}</div>
                <div class="price">
                  <span>￥{{ item.gprice }}</span>
                  <del>￥{{ item.gmprice }}</del>
                </div>
                <div class="count">
                  <button @click="[decCount(item, -1)]">-</button>
                  <input type="text" v-model="item.gcount" />
                  <button @click="[addCount(item, 1)]">+</button>
                </div>
              </div>
            </div>
            <div class="mark-up">
              <span><i>加价购</i>购买一件，即可享受换购优惠</span>
              <span>去换购<span class="icon-angle-right"></span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="mod-pay">
        <div class="cell-left">
          <input type="checkbox" @click="selectAllBtn" :checked="lenCompaire" name="checkall" />
          <label for="checkall">&nbsp;全选&nbsp;</label>
          <span> &nbsp;优惠：￥<i>0.00</i></span>
        </div>
        <div class="cell-right" v-if="editbtn" @click="goOrder">
          ￥<span>{{ allPrice.price.toFixed(2) }}</span> 结算({{
            allPrice.count
          }})
        </div>
        <div class="cell-right" @click="deleteAll" v-else>
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="layout-main" v-else>
      <div class="mod-main">
        <div class="cell-main">
          <span>购物车空空如也，去首页选择喜欢的商品吧~</span>
        </div>
      </div>
    </div>
    <div class="layout-tabbar">
      <Tabbar></Tabbar>
    </div>
    <div class="layout-dialog"></div>
  </div>
</template>

<script>
import { getCart, addGoodsToCart, deleteCart } from "@/api/axios";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Tabbar from "@/components/Tabbar.vue";
export default {
  name: "Cart",
  components: { Tabbar },
  data() {
    return {
      recomend: [], //猜你喜欢商品
      allprice: 0, //pay 总价
      allcount: 0, //pay 总数量
      isshow: true,
      currentGoodIndex: [],
      editbtn: true,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      uid: state => state.user.userInfo.uid,
      cartList: (state) => state.cartList.cartList,
      selectList: (state) => state.cartList.selectList,
    }),
    ...mapGetters(["lenCompaire", "allPrice"]),
  },
  methods: {
    ...mapMutations([
      "setCartList",
      "checkAll",
      "unCheckAll",
      "checkOne",
      "updateItemCount",
      "setSelectList",
      "setOrderList",
      "deleteItem"
    ]),
    ...mapActions(["selectAllBtn"]),
    goback() {
      this.$router.go(-1);
    },
    edit() {
      this.editbtn = !this.editbtn;
    },
    // 登录操作数据库
    sendDeleteItemAxios(item) {
      // 批量删除
      if (Array.isArray(item)) {
        item.forEach(e => {
          // let obj = { gid: e }
          deleteCart(this.uid, e.gid).then(res => {
            // 操作vuex
            this.deleteItem(e)
          })
        }
        )
      } else {
        // 单个删除
        deleteCart(this.uid, item.gid).then(res => {
          // 操作vuex
          this.deleteItem(item)
        })
      }
    },
    // noLogin
    noLoginDeleteItem(item) {
      if (Array.isArray(item)) {
        item.forEach(e => {
          this.deleteItem(e)
        }
        )
      } else {
        this.deleteItem(item)
      }
    },
    deleteAll() {
      // console.log(selectList);
      if (this.token) {
        this.$dialog({
          el: '.layout-dialog',
          deleteItem: this.sendDeleteItemAxios,
          arrparamter: this.selectList
        })
      } else {
        this.$dialog({
          el: '.layout-dialog',
          deleteItem: this.noLoginDeleteItem,
          arrparamter: this.selectList
        })
      }
    },
    // 点击+号增加或减少商品数量时，自动checkbox checked
    addCount(item, count) {
      // 登录状态
      if (this.token) {
        addGoodsToCart(this.uid, item.gid, 1).then(() => {
          this.updateItemCount({ item, count });
        });
      } else {
        this.updateItemCount({ item, count });
      }
    },
    // 操作单个商品
    decCount(item, count) {
      console.log(item);
      if (item.gcount <= 1) {
        if (this.token) {
          this.$dialog({
            el: '.layout-dialog',
            deleteItem: this.sendDeleteItemAxios,
            objparamter: item
          })
        } else {
          this.$dialog({
            el: '.layout-dialog',
            deleteItem: this.noLoginDeleteItem,
            objparamter: item
          })
        }
      } else {
        if (this.token) {
          addGoodsToCart(this.uid, item.gid, -1).then(() => {
            this.updateItemCount({ item, count });
          });
        } else {
          this.updateItemCount({ item, count })
        }
      }
    },
    // 去支付 跳转到订单详情页
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
  },
  created() {
    let cart = localStorage.getItem("cartList");
    // 获取购物车数据：若登录则从数据库获取，若未登录从localstorage中获取
    if (this.token) {
      // 用于保存组件数据，避免多次刷新
      if (cart === null) {
        getCart(this.uid).then((res) => {
          this.setCartList(res.data.data);
        });
      }
    } else {
      
      if (cart !== null) {
        this.setCartList(JSON.parse(cart));
      } else {
        this.setCartList([]);
      }
    }
  },
  destroyed() {
    // console.log("CART组件被销毁了");
    // this.setSelectList([]);
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  padding: 0 0.3125rem;
  flex-shrink: 0;
  flex-grow: 0;

  input[type="checkbox"] {
    width: 1.125rem;
    height: 1.125rem;
    border: 1px solid #999;
    border-radius: 50%;
    vertical-align: bottom;
    -webkit-appearance: none;

    &:checked {
      background-color: red;
    }
  }
}

.container-cart {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: #eee;
  color: black;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .layout-header {
    margin-bottom: 0.5rem;
    height: 5rem;

    .mod-header {
      padding: 0.5rem;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100vw;
      background-color: #fff;

      .cell-header {
        position: relative;
        display: flex;
        justify-content: center;

        span:nth-child(1) {
          margin-top: -0.625rem;
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 1.25rem;
        }

        span:nth-child(2) {
          line-height: 1.5rem;
          font-size: 1.25rem;
        }
      }
    }

    .mod-operate {
      position: fixed;
      top: 2.5rem;
      left: 0;
      z-index: 1000;
      width: 100vw;
      background-color: #fff;

      .cell-item {
        padding: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.5rem;
      }
    }
  }

  .layout-main {
    margin-bottom: 3.75rem;

    .mod-cartlist {
      padding: 0 0.625rem;

      .sec-mod-item {
        margin-bottom: 0.5rem;
        background-color: #fff;
        border-radius: 1rem;
        display: flex;
        align-items: center;

        .cell-cart-info {
          padding-right: 0.625rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          font-size: 0.875rem;

          .discount {
            display: flex;
            justify-content: space-between;
            height: 2.5rem;
            align-items: center;

            i {
              font-style: normal;
              padding: 0.125rem;
              background-color: crimson;
              font-size: 0.75rem;
              color: #fff;
            }

            span:nth-child(2) {
              color: crimson;
            }
          }

          .goods-info-box {
            display: flex;

            img {
              height: 5rem;
              width: 5rem;
            }

            .goods-info {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding-left: 0.625rem;
              position: relative;

              .title {
                font-size: 1rem;
              }

              .price {
                span {
                  font-size: 1.125rem;
                  color: red;
                }

                del {
                  font-size: 0.875rem;
                  color: #999;
                }
              }

              .count {
                position: absolute;
                bottom: 0.3125rem;
                right: 0;

                button {
                  padding: 0.3125rem;
                  font-size: 1.25rem;
                  background-color: #fff;
                }

                input {
                  padding: 2px 0.3125rem;
                  font-size: 1.125rem;
                  width: 2.5rem;
                  outline: none;
                  border: none;
                  background-color: #eee;
                  text-align: center;
                }
              }
            }
          }

          .mark-up {
            padding: 0.625rem 0;
            display: flex;
            justify-content: space-between;

            span:nth-child(1) {
              color: #999;

              i {
                padding: 0.125rem;
                margin-right: 0.625rem;
                border: 1px solid crimson;
                color: crimson;
                font-style: normal;
              }
            }
          }
        }
      }
    }

    .mod-pay {
      margin: 0 auto;
      position: fixed;
      bottom: 3.75rem;
      right: 0.625rem;
      display: flex;
      width: calc(100vw - 1.25rem);
      height: 3.125rem;

      .cell-left,
      .cell-right {
        flex-grow: 1;
        padding: 0 1.25rem;
        display: flex;
        align-items: center;
        border-top-left-radius: 1.5625rem;
        border-bottom-left-radius: 1.5625rem;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
      }

      .cell-right {
        border-radius: 0;
        border-top-right-radius: 1.5625rem;
        border-bottom-right-radius: 1.5625rem;
        background-color: red;
      }
    }
  }

  .alert-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background-color: transparent;

    .alert-pannel {
      padding: 0.625rem;
      margin-top: -8.125rem;
      margin-right: -9.375rem;
      position: fixed;
      top: 50%;
      right: 50%;
      height: 16.25rem;
      width: 18.75rem;
      z-index: 1000;
      background-color: #fff;
      box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);

      .header {
        display: flex;
        justify-content: space-between;
        font-size: 1.125rem;
      }

      p {
        height: 9.375rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .btn {
        display: flex;
        justify-content: space-around;

        button {
          padding: 0.5rem 2.5rem;
          font-size: 1rem;
        }

        .sure {
          background-color: #32cd32;
          color: #fff;
        }

        .cancel {
          color: #32cd32;
        }
      }
    }
  }

  .layout-tabbar {
    height: 3.125rem;
  }
}
</style>