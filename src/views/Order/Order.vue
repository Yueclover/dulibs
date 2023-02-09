<template>
  <div class="container-order">
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-header">
          <span class="icon-angle-left" @click="goback"></span>
          <span>确认订单</span>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <div class="mod-item mod-address" v-if="Object.keys(currentAddress).length">
        <div class="cell-item">
          <span class="name">{{ currentAddress.consigneeName }}</span>
          <span class="tel">{{ currentAddress.consigneeTel }}</span>
        </div>
        <div class="cell-item">
          <span>{{
            currentAddress.consigneePC + currentAddress.consigneeDetailAdd
          }}</span>
        </div>
        <div class="cell-item cell-right" @click="chooseAddress">
          <span class="icon-angle-right"></span>
        </div>
      </div>
      <div class="mod-item mod-address" v-else>
        <div class="cell-item">
          <span>先填写地址，再确认订单信息</span>
        </div>
        <div class="cell-item cell-right" @click="goAddAddress">
          <span class="icon-angle-right"></span>
        </div>
      </div>
      <div class="mod-item mod-payment">
        <div class="cell-item"><span>支付方式</span></div>
        <div class="cell-item"><span>微信支付</span></div>
        <div class="cell-item cell-right">
          <span class="icon-angle-right"></span>
        </div>
      </div>
      <div class="mod-item mod-order-detail">
        <div class="sec-mod-item sec-mod-booklist">
          <div class="cell-item cell-booklist" v-for="(item, index) in orderList" :key="index">
            <img :src="item.gmainImg" alt="" />
            <span>x{{ item.gcount }}</span>
          </div>
          <div class="cell-item cell-right">
            <span class="icon-angle-right"></span>
          </div>
        </div>
        <div class="sec-mod-item">
          <div class="cell-item"><span>配送</span></div>
          <div class="cell-item cell-dilivery">
            <span style="font-weight: bold">快递运输 免运费</span>
            <span>工作日、节假日均可送货</span>
          </div>
          <div class="cell-item cell-right">
            <span class="icon-angle-right"></span>
          </div>
        </div>
        <div class="sec-mod-item">
          <div class="cell-item"><span>包装升级</span></div>
          <div class="cell-item">
            <span style="font-weight: bold">去选购</span>
          </div>
          <div class="cell-item cell-right">
            <span class="icon-angle-right"></span>
          </div>
        </div>
      </div>
      <div class="mod-item mod-order-price">
        <div class="sec-mod-item">
          <div class="cell-item"><span>商品金额</span></div>
          <div class="cell-item">
            <span>￥{{ (totalPrice + freight).toFixed(2) }}</span>
          </div>
        </div>
        <div class="sec-mod-item">
          <div class="cell-item"><span>运费</span></div>
          <div class="cell-item"><span>+￥0.00 </span></div>
        </div>
      </div>
    </div>
    <div class="layout-tabbar">
      <div class="mod-item mod-tabbar">
        <div class="cell-item cell-left">
          <span>实付:</span>
          <span>￥{{ (totalPrice + freight).toFixed(2) }}</span>
        </div>
        <div class="cell-item cell-right">
          <button @click="submitOrder">提交订单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import timedataFMT from '@/api/timedataFMT.js'
import { getMyAddress, submitOrder, deleteCart, payment } from "@/api/axios";
export default {
  name: "Order",
  data() {
    return {
      freight: 0,
      currentAddress: {},
    };
  },
  computed: {
    ...mapState({
      uid: (state) => state.user.userInfo.uid,
      selectList: (state) => state.cartList.selectList,
      cartList: (state) => state.cartList.cartList,
      orderList: (state) => state.order.orderList,
      selectAddress: state => state.address.selectAddress,
      myAddress: (state) => state.address.myAddress,
    }),
    ...mapGetters(["totalPrice"]),
  },
  methods: {
    ...mapMutations(["setOrderList", "setMyAddress", "deleteItem"]),
    goback() {
      this.$router.go(-1);
      this.setOrderList([])
      localStorage.removeItem('orderList')
    },
    submitOrder() {
      // 创建订单，订单状态为待支付（1），并修改购物车中数据
      if (!this.orderList.length) {
        this.$router.push({
          name: 'Cart'
        })
      } else {
        let oid = timedataFMT()
        submitOrder(oid, this.uid, (this.totalPrice + this.freight).toFixed(2), this.selectAddress.addId, JSON.stringify(this.orderList), 1)
          .then(res => {
            // 删除cartLIst中的相同商品
            if (this.cartList.length) {
              if (this.orderList === this.cartList) {
                this.orderList.forEach(e => {
                  deleteCart(this.uid, e.gid).then(res => {
                    // 操作vuex
                    this.deleteItem(e)
                  })
                })
              } else {
                this.orderList.forEach(o => {
                  const c = this.cartList.find((item, index) => {
                    return item.gid === o.gid
                  })
                  deleteCart(this.uid, c.gid).then(res => {
                    // 操作vuex
                    this.deleteItem(c)
                  })
                })
              }
            } else {
              // 立即购买过来的
              console.log("立即购买");
            }
            payment(oid, (this.totalPrice + this.freight).toFixed(2), '我的书').then(res => {
              if (res.data.success) {
                console.log(res.data);
                window.location.href = res.data.paymentUrl
              }
            })
          })
      }
    },
    chooseAddress() {
      this.$router.push({
        name: "MyAddress",
      });
    },
    goAddAddress() {
      this.$router.push({
        name: "AddMyAddress",
      });
    },
    // vuex中有地址，设置默认地址
    setDefaultAddress() {
      let defaultAddres = {}
      this.currentAddress = this.myAddress.some(e => {
        if (e.status === 1) {
          defaultAddres = e
          return true
        }
      }) ? defaultAddres : this.myAddress[0]
    }
  },
  created() {
    // 获得收货地址
    // 是否有selectAddress,若有，则为selectAddress
    // 无则
    // 默认为默认地址，无默认地址，使用index=0的，
    // 无地址，判断用户数据库中是否存在
    if (Object.keys(this.selectAddress).length) {
      this.currentAddress = this.selectAddress
    } else if (!this.myAddress.length) {
      // vuex中无地址
      getMyAddress(this.uid).then((res) => {
        if (res.data.data.length) {
          this.setMyAddress(res.data.data);
          this.setDefaultAddress()
        } else {
          this.defaultAddres = {}
        }
      });

    } else {
      // 用户已获得地址
      this.setDefaultAddress()
    }
  },
  destroyed() {
  },
};
</script>

<style scoped lang="scss">
.container-order {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #eee;

  .layout-header {
    margin-bottom: 0.5rem;
    background-color: #fff;

    .mod-header {
      padding: 0.5rem;

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
  }

  .layout-main {
    padding: 0.5rem;
    height: calc(100vh - 3rem - 3.75rem);
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .mod-item {
      margin-bottom: 0.5rem;
      padding: 1rem;
      position: relative;
      border-radius: 0.5rem;
      background-color: #fff;
      font-size: 1.125rem;

      .cell-right {
        margin-top: -1rem;
        position: absolute;
        top: 50%;
        right: 1rem;
        font-size: 1.5rem;
      }
    }

    .mod-address {
      display: flex;
      flex-direction: column;
      font-size: 1.125rem;

      .cell-item:nth-child(1) {
        position: relative;
        display: flex;
        margin-bottom: 0.5rem;
        align-items: center;

        span.name {
          flex: 0 1 5rem;
          margin-right: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: bold;
        }

        span.tel {
          flex: 0 1 7.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .mod-payment {
      padding-right: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cell-item:nth-child(2) {
        font-weight: bold;
      }
    }

    .mod-order-detail {
      padding: 0rem;

      .sec-mod-item {
        padding: 1rem;
        padding-right: 2rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #aaa;

        &:last-child {
          border: none;
        }

        .cell-right {
          margin-top: -1rem;
          position: absolute;
          top: 50%;
          right: 1rem;
          font-size: 1.5rem;
        }

        .cell-dilivery {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      }

      .sec-mod-booklist {
        display: flex;
        justify-content: flex-start;

        .cell-booklist {
          position: relative;
          flex: 0 0 auto;
          margin-right: 0.5rem;
          max-width: calc((100% - 0.5rem * 4) / 4);
          min-width: calc((100% - 0.5rem * 4) / 4);

          img {
            width: 100%;
            height: auto;
          }

          &>span {
            position: absolute;
            bottom: 0.3125rem;
            right: 0.3125rem;
            height: 1rem;
            width: 1rem;
            font-size: 0.875rem;
            color: #666;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 0.3125rem;
          }
        }
      }
    }

    .mod-order-price {
      padding: 0;

      .sec-mod-item {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #aaa;

        &:last-child {
          border-bottom: none;
        }

        .cell-item:nth-child(2) {
          font-weight: bold;
        }
      }
    }
  }

  .layout-tabbar {
    .mod-tabbar {
      padding: 0 0.5rem;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-content: center;
      width: 100vw;
      height: 3.75rem;
      background-color: #fff;
      line-height: 3.75rem;

      .cell-left {
        font-weight: bold;

        span:nth-child(1) {}

        span:nth-child(2) {
          font-size: 1.25rem;
          color: red;
        }
      }

      .cell-right {
        button {
          padding: 0.5rem 2rem;
          border-radius: 1.875rem;
          background-color: green;
          font-size: 1.25rem;
          color: #fff;
        }
      }
    }
  }
}
</style>