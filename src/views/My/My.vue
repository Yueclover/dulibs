<template>
  <div class="container-my">
    <div class="layout-login-status">
      <div class="mod-login-info">
        <div class="cell-login" v-if="token" @click="goShowDetailInfo">
          <img :src="userInfo.imgUrl===null ? 'logo2.png' :'' " alt="" />
          <span
            ><i>{{ userInfo.uname }}</i
            ><br /><i>暂无购书</i></span
          >
        </div>
        <div class="cell-unlogin" v-else @click="goLogin">
          <span>登录/注册</span>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <div class="mod-item mod-order-status">
        <div class="sec-mod-top">
          <div class="cell-item">
            <span></span>
            <span>商品收藏</span>
          </div>
          <div class="cell-item">
            <span></span>
            <span>关注店铺</span>
          </div>
          <div class="cell-item">
            <span></span>
            <span>浏览记录</span>
          </div>
        </div>
        <div class="sec-mod-btm">
          <div class="cell-item">
            <span class="icon-book"></span>
            <span>待付款</span>
          </div>
          <div class="cell-item">
            <span class="icon-book"></span>
            <span>待收货</span>
          </div>
          <div class="cell-item">
            <span class="icon-book"></span>
            <span>待评价</span>
          </div>
          <div class="cell-item">
            <span class="icon-book"></span>
            <span>退款/售后</span>
          </div>
          <div class="cell-item">
            <span class="icon-book"></span>
            <span>全部订单</span>
          </div>
        </div>
      </div>
      <div class="mod-item mod-address">
        <div class="cell-item" @click="goMyAddress">
          <span class="icon-headset_mic"></span>
          <span>我的地址</span>
        </div>
        <div class="cell-item" @click="goMyAddress">
          <span class="icon-headset_mic"></span>
          <span>我的地址</span>
        </div>
        <div class="cell-item" @click="goMyAddress">
          <span class="icon-headset_mic"></span>
          <span>我的地址</span>
        </div>
        <div class="cell-item" @click="goMyAddress">
          <span class="icon-headset_mic"></span>
          <span>我的地址</span>
        </div>
      </div>
    </div>
    <div class="layout-tabbar">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tabbar from "@/components/Tabbar.vue";
export default {
  name: "My",
  components: {
    Tabbar,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      token: (state) => state.user.token,
    }),
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    goShowDetailInfo() {
      this.$router.push("/myinfo");
    },
    goMyAddress() {
      this.$router.push("/myaddress");
    },
  },
  mounted(){
    // console.log(this.userInfo.imgUrl === null);
  }
};
</script>

<style scoped lang="scss">
.container-my {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: #eee;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .layout-login-status {
    padding: 0.5rem;
    .cell-login {
      display: flex;
      img {
        margin-right: 0.625rem;
        height: 3.75rem;
        width: 3.75rem;
        border-radius: 50%;
      }
      span {
        padding:.5rem 0;
        i:nth-child(1){
          font-size: 1rem;
          font-weight: bold;
          color: black;
        }
        font-size: 0.875rem;
        color: #999;
      }
    }
    .cell-unlogin {
      font-size: 1.25rem;
    }
  }
  .layout-main {
    padding: 0.5rem;
    .mod-item {
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      border-radius: 1rem;
      background-color: #fff;
    }
    .mod-order-status {
      .sec-mod-top {
        padding: 0.5rem 0;
        display: flex;
        border-bottom: 1px solid #eee;
        .cell-item {
          border-right: 1px solid #eee;
          text-align: center;
          max-width: calc(100% / 3);
          min-width: calc(100% / 3);
          &:last-child {
            border: none;
          }
        }
      }
      .sec-mod-btm {
        padding: 0.5rem 0;
        display: flex;
        .cell-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: calc(100% / 5);
          min-width: calc(100% / 5);
          span {
            font-size: 0.875rem;
            &:first-child {
              font-size: 1.25rem;
            }
          }
        }
      }
    }
  }
  .mod-address {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    .cell-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: calc(100% / 4);
      min-width: calc(100% / 4);
      & > [class^="icon-"] {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
      }
    }
  }
}
</style>