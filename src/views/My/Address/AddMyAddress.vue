<template>
  <div class="container-add">
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-item">
          <span class="icon-angle-left" @click="goback"></span>
          <span>添加收货地址地址</span>
        </div>
      </div>
    </div>
    <div class="layout-form">
      <div class="mod-form">
        <div class="cell-item">
          <span>收货人</span>
          <input
            type="text"
            name=""
            id="consignee"
            placeholder="名字"
            v-model="consignee"
          />
        </div>
        <div class="cell-item">
          <span>手机号</span>
          <input
            type="text"
            name=""
            id="tel"
            placeholder="手机号"
            v-model="tel"
          />
        </div>
        <div class="cell-item">
          <span>所在地区</span>
          <input
            type="text"
            name=""
            id="region"
            placeholder="省、市、区、街道"
            v-model="region"
          />
        </div>
        <div class="cell-item">
          <span>详细地址</span>
          <textarea
            name=""
            id=""
            cols="30"
            rows="3"
            placeholder="小区楼栋/乡村名称"
            v-model="fullAddress"
          ></textarea>
        </div>
        <div class="cell-item cell-set">
          <span>设为默认收货地址</span>
          <span @click="changeSet" :class="!status ? '' : 'active-bgc'">
            <input type="checkbox" class="left" v-if="!status" />
            <input type="checkbox" class="right" v-else />
          </span>
        </div>
        <div class="cell-item cell-btn" @click="addAddress">
          <span>保存</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addMyAddress } from "@/api/axios";
import { mapState } from "vuex";
export default {
  name: "AddMyAddress",
  data() {
    return {
      status: 0,
      consignee: "",
      tel: "",
      region: "",
      fullAddress: "",
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
    // 是否设为默认地址
    changeSet() {
      this.status = !this.status;
    },
    // sendAxios
    sendAxios() {
      let status = 0;
      if (this.status) {
        status = 1;
      }
      addMyAddress(
        this.uid,
        this.consignee,
        this.tel,
        this.region,
        this.fullAddress,
        status
      ).then(
        (res) => {
          if (res.status) {
            this.$message({
              content: "添加成功",
              type: "success",
            }).show();
          } else {
            this.$message({
              content: "服务器繁忙，请稍后",
              type: "err",
            }).show();
          }
        },
        (err) => {
          this.$message({
            content: "服务器繁忙，请稍后",
            type: "err",
          }).show();
        }
      );
    },
    // 发送axios，添加新地址
    addAddress() {
      if (
        !this.uid ||
        !this.consignee ||
        !this.tel ||
        !this.region ||
        !this.fullAddress
      ) {
        this.$message({
          content: "信息不能为空",
          type: "warn",
        }).show();
      } else {
        this.sendAxios();
        this.$router.go(-1)
      }
    },
  },
  // beforeRouteLeave(to,from,next){
  //   if(to.name="Order"){
      
  //   }
  // }
};
</script>

<style scoped lang="scss">
.container-add {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #fff;
  .layout-header {
    margin-bottom: 0.5rem;
    background-color: #eee;
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
  .layout-form {
    .mod-form {
      margin: 0 auto;
      padding: 0 1rem;
      max-width: 31.25rem;
      .cell-item {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        span {
          width: 5rem;
          font-weight: 600;
        }
        input,
        textarea {
          flex: 1 1 auto;
          padding: 1rem 0.5rem;
          max-width: 18.75rem;
          outline: none;
          border: none;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          background-color: #eee;
        }
      }
      .cell-set {
        justify-content: space-between;
        span:nth-child(1) {
          flex: 1 1 auto;
        }
        span:nth-child(2) {
          position: relative;
          width: 3rem;
          height: 1.5rem;
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 0.75rem;
          input {
            padding: 0;
            height: 100%;
            width: 50%;
            appearance: none;
            -webkit-appearance: none;
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
      .cell-btn {
        margin: 2rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        max-width: 31.25rem;
        border-radius: 1.25rem;
        background-color: orangered;
        span {
          font-weight: lighter;
          color: #fff;
        }
      }
    }
  }
}
</style>