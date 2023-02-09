<template>
  <div class="container-address">
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-item">
          <span class="icon-angle-left" @click="goback"></span>
          <span>我的地址</span>
        </div>
      </div>
    </div>
    <div class="layout-address" v-if="Object.keys(myAddress).length">
      <div class="mod-address-item" v-for="(item, index) in myAddress" :key="index">
        <div class="sec-mod-item sec-mod-left" @click="orderList.length ? setOrderAddress(item) : function () { }">
          <div class="cell-item">
            <span class="name">{{ item.consigneeName }}</span>
            <span class="tel">{{ item.consigneeTel }}</span>
            <span class="label">
              <i v-show="item.status">默认</i>
              <i v-show="item.addLabel">{{ item.addLabel }}</i>
            </span>
            <!-- <span class="label" v-show="item.status">默认</span>
            <span class="label labelt" v-show="item.addLabel">{{
              item.addLabel
            }}</span> -->
          </div>
          <div class="cell-item">
            <span>{{ item.consigneePC + item.consigneeDetailAdd }}</span>
          </div>
        </div>
        <div class="sec-mod-item sec-mod-right" @click="alterAddress(item)">
          <div class="cell-item">
            <span class="icon-dots-three-horizontal"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-address"
      style="margin-top:-4rem;display:flex;flex-direction:column;align-items:center;justify-content:center" v-else>
      <h4>一个地址也没有</h4>
      <span>快去添加收获地址，买买买吧</span>
    </div>
    <div class="layout-tabbar">
      <div class="mod-tabbar">
        <div class="cell-tabbar" @click="addAddress">
          <span>+ 添加收货地址</span>
        </div>
      </div>
    </div>
    <div class="layout-tabbar-panel" v-show="isShowEditPanel">
      <div class="mod-editpanel-item sec-mod-editpanel-top">
        <div class="cell-item" @click="setDefault()"><span>设为默认</span></div>
        <div class="cell-item" @click="editDefault()"><span>编辑</span></div>
        <div class="cell-item" @click="deleteAddress"><span style="color: orangered">删除</span></div>
      </div>
      <div class="mod-editpanel-item sec-mod-editpanel-btm">
        <div class="cell-item" @click="hiddenEditPanel"><span>取消</span></div>
      </div>
    </div>
    <div class="layout-dialog">
    </div>
  </div>
</template>

<script>
import { getMyAddress, updateMyAddress, deleteOneAddress } from "@/api/axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "MyAddress",
  data() {
    return {
      fromRouterName: false,
      isShowEditPanel: false,
      currentAddress: {},
    };
  },
  computed: {
    ...mapState({
      myAddress: (state) => state.address.myAddress,
      uid: (state) => state.user.userInfo.uid,
      orderList: state => state.order.orderList
    }),
  },
  methods: {
    ...mapMutations(["setSelectAddress", "setMyAddress"]),
    goback() {
      this.$router.go(-1);
    },
    // 从订单页进入，修改订单地址
    setOrderAddress(item) {
      this.setSelectAddress(item);
      this.goback();
    },
    addAddress() {
      this.$router.push({
        name: "AddMyAddress",
      });
    },
    // 编辑地址
    alterAddress(item) {
      this.isShowEditPanel = true;
      this.currentAddress = item;
    },
    hiddenEditPanel() {
      this.isShowEditPanel = false;
      // this.currentAddress = {}
    },
    // 设为默认
    setDefault() {
      updateMyAddress(this.uid, this.currentAddress.addId, 1).then((res) => {
        getMyAddress(this.uid).then((res) => {
          this.setMyAddress(res.data.data);
        });
        this.hiddenEditPanel();
      });
    },
    // 编辑
    editDefault() {
      this.$router.push({
        name: 'EditMyAddress',
        query: {
          addId: this.currentAddress.addId,
        }
      })
    },
    sendDeleteItemAxios(item) {
      deleteOneAddress(this.uid, item.addId).then(res => {
        getMyAddress(this.uid).then((res) => {
          this.setMyAddress(res.data.data);
        });
      })
    },
    // 删除地址
    deleteAddress() {
      this.isShowEditPanel = false
      this.$dialog({
        el: '.layout-dialog',
        deleteItem: this.sendDeleteItemAxios,
        objparamter: this.currentAddress
      })
    },
  },
  async created() {
    try {
      await  getMyAddress(this.uid).then((res) => {
        // console.log(res);
        this.setMyAddress(res.data.data);
      })
    }catch(err){
      console.log(err);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (from.name == "Order") {
  //     next((vm) => (vm.fromRouterName = true));
  //   } else {
  //     // this.fromRouterName = false
  //     next((vm) => (vm.fromRouterName = false));
  //   }
  // },
};
</script>

<style scoped lang="scss">
.container-address {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #eee;

  .layout-header {
    margin-bottom: 0.5rem;
    background-color: #fff;

    .mod-header {
      padding: 0.5rem;

      .cell-item {
        position: relative;
        display: flex;
        justify-content: space-between;
        font-size: 1.125rem;
        line-height: 1.5rem;

        span:nth-child(1) {
          margin-top: -0.75rem;
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 1.5rem;
        }

        span:nth-child(2) {
          padding-left: 2rem;
        }

        span:nth-child(3) {
          padding-right: 0.5rem;
          color: orangered;
        }
      }
    }
  }

  .layout-address {
    padding: 0 0.5rem;
    overflow: auto;
    height: calc(100vh - 2.5rem);
    width: 100%;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .mod-address-item {
      padding: 0.5rem 1rem;
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 1.125rem;
      background-color: #fff;
      border-radius: 1rem;

      .sec-mod-left {
        flex: 1 1 auto;

        .cell-item:nth-child(1) {
          position: relative;
          display: flex;
          margin-bottom: 0.5rem;
          align-items: center;

          span.name {
            flex: 0 1 4rem;
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

          span.label {
            margin-top: -0.9rem;
            position: absolute;
            top: 50%;
            left: 12rem;
            display: flex;

            i {
              margin-right: 2px;
              padding: 3px 0.8rem;
              line-height: 1.5rem;
              border-radius: 0.75rem;

              &:nth-of-type(1) {
                // border: 1px solid red;
                background-color: rgba(255, 0, 0, 0.1);
                color: red;
              }

              &:nth-of-type(2) {
                // border: 1.5px solid blue;
                background-color: rgba(0, 0, 255, 0.1);
                color: blue;
              }
            }
          }

          // span.label {
          //   margin-top: -0.9rem;
          //   margin-right: 0.5rem;
          //   padding: 0 0.8rem;
          //   position: absolute;
          //   top: 50%;
          //   left: 13rem;
          //   line-height: 1.5rem;
          //   border: 1px solid red;
          //   background-color: rgba(255, 0, 0, 0.1);
          //   color: red;
          //   border-radius: 0.75rem;
          // }
          // span.labelt {
          //   border: 1.5px solid blue;
          //   background-color: rgba(0, 0, 255, 0.1);
          //   color: blue;
          // }
        }
      }

      .sec-mod-right {
        margin-left: 0.5rem;
      }
    }
  }

  .layout-tabbar {
    .mod-tabbar {
      padding: 1rem 0.5rem;
      position: fixed;
      bottom: 0.5rem;
      left: 0;
      width: 100%;

      .cell-tabbar {
        line-height: 3.125rem;
        width: 100%;
        text-align: center;
        border-radius: 1.5625rem;
        background-color: orangered;
        color: #fff;
        font-size: 1.25rem;
      }
    }
  }

  .layout-tabbar-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100vh - 2.5rem);
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);

    .mod-editpanel-item {
      margin: 0 auto 0.5rem;
      width: calc(100vw - 1rem);
      background-color: #fff;
      border-radius: 1rem;

      .cell-item {
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        color: rgba(5, 116, 243, 0.712);
        text-align: center;

        &:last-of-type {
          border: none;
        }
      }
    }
  }

}
</style>