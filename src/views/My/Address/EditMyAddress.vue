<template>
  <div class="container-edit">
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-item">
          <span class="icon-angle-left" @click="goback"></span>
          <span>修改收货地址</span>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <div class="mod-form">
        <div class="cell-item">
          <span>联系人信息</span>
          <span>联系人</span>
        </div>
        <div class="cell-item">
          <input type="text" name="" id="" v-model="consignee" />
          <input type="text" name="" id="" v-model="tel" />
        </div>
        <div class="cell-item">
          <span>{{ region }}</span>
          <span>定位</span>
        </div>
        <div class="cell-item">
          <input type="text" name="" id="" v-model="fullAddress" />
        </div>
        <div class="cell-item cell-set">
          <span>设为默认地址</span>
          <span @click="changeSet" :class="!status ? '' : 'active-bgc'">
            <input type="checkbox" class="left" v-if="!status" />
            <input type="checkbox" class="right" v-else />
          </span>
        </div>
      </div>
    </div>
    <div class="layout-tabbar">
      <div class="mod-btn" @click="editAddress">
        <div class="cell-btn">
          <span>保存</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneAddress, updateMyAddress } from "@/api/axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "EditMyAddress",
  data() {
    return {
      addId: null,
      consignee: "",
      tel: "",
      region: "",
      fullAddress: "",
      status: 0,
    };
  },
  computed: {
    ...mapState({
      uid: (state) => state.user.userInfo.uid,
    }),
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    changeSet() {
      this.status = !this.status;
      if(this.status){
        this.status = 1
      }else{
        this.status = 0
      }
    },
    editAddress() {
      updateMyAddress(
        this.uid,
        this.addId,
        this.status,
        this.consignee,
        this.tel,
        this.region,
        this.fullAddress
      ).then(res=>{
        console.log(res.data);
        this.goback()
      })
    },
  },
  created() {
    getOneAddress(this.uid, this.$route.query.addId).then((res) => {
      this.consignee = res.data.data.consigneeName;
      this.tel = res.data.data.consigneeTel;
      this.region = res.data.data.consigneePC;
      this.fullAddress = res.data.data.consigneeDetailAdd;
      this.status = res.data.data.status;
      this.addId = res.data.data.addId;
    });
  },
};
</script>

<style scoped lang="scss">
input[type="text"] {
  outline: none;
  border: none;
  background-color: #fff;
  font-size: 0.875rem;
  font-weight: bold;
  width: 100%;
}
.container-edit {
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
  .layout-main {
    padding: 0 0.5rem;
    .mod-form {
      background-color: #fff;
      border-radius: 1rem;
      .cell-item {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        font-size: 0.875rem;
        font-weight: bold;
        &:last-of-type,
        &:first-of-type {
          border: none;
        }
      }
      .cell-set {
        span:nth-child(2) {
          position: relative;
          width: 3rem;
          height: 1.5rem;
          background-color: #eee;
          border: 1px solid #ccc;
          border-radius: 0.75rem;
          input {
            padding: 0;
            height: 100%;
            width: 50%;
            appearance: none;
            -webkit-appearance: none;
            background-color: #fff;
            border-radius: 0.75rem;
          }
          input.left {
            position: absolute;
            top: 0;
            left: 0;
          }
          input.right {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        span:nth-child(2).active-bgc {
          background-color: orangered;
        }
      }
    }
  }
  .layout-tabbar {
    .mod-btn {
      margin-left: calc((100vw - 2rem) / -2);
      position: fixed;
      bottom: 2rem;
      left: 50%;
      width: calc(100vw - 2rem);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      border-radius: 1.25rem;
      background-color: orangered;
      span {
        font-weight: lighter;
        color: #fff;
      }
    }
  }
}
</style>