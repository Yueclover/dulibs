<template>
  <div class="container-register">
    <div class="layout-header">
      <div class="mod-header">
        <div class="cell-header">
          <span class="icon-angle-left" @click="back"></span>
          <span>注册</span>
        </div>
      </div>
    </div>
    <div class="layout-main">
      <div class="mod-register-form">
        <div class="cell-item">
          <input type="text" placeholder="请输入手机号" v-model="tel" autocomplete="on" />
        </div>
        <form class="cell-item">
          <input type="password" placeholder="请输入密码" v-model="psd" autocomplete="off"/>
        </form>
        <form class="cell-item">
          <input type="password" placeholder="请确认密码" v-model="repsd" autocomplete="off"/>
        </form>
        <div class="cell-item">
          <input type="button" value="注册" @click="register" />
        </div>
        <div class="cell-item">
          <span @click="goLogin">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/axios";
export default {
  name: "Register",
  data() {
    return {
      tel: "",
      psd: "",
      repsd: "",
      rules: {
        tel: {
          reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
          msg: "手机号格式错误",
        },
        psd: {
          reg: /^[a-zA-Z][a-zA-Z0-9]{5,11}$/,
          msg: "密码格式错误，请以字符开头，且长度为6-12位",
        },
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    validate(key) {
      return this.rules[key].reg.test(this[key]);
    },
    register() {
      // 前端验证
      let psd = this.validate("psd");
      let tel = this.validate("tel");
      if (!tel) {
        this.$message({
          content: "手机号格式错误",
          type: "err",
        }).show();
      } else if (!psd) {
        this.$message({
          content: "密码格式错误",
          type: "err",
        }).show();
      } else if (this.psd !== this.repsd) {
        this.$message({
          content: "请重新确认密码",
          type: "err",
        }).show();
      } else {
        this.sendRegisterAxios();
      }
    },
    sendRegisterAxios() {
      register(this.tel, this.psd).then(
        (res) => {
          if (res.data.code === 1) {
            this.$message({
              content: "注册成功",
              type: "success",
            }).show();
            this.$router.push({
              name: "Login",
            });
          } else if (res.data.code === 0) {
            this.$message({
              content: "手机号已注册",
              type: "err",
            }).show();
          }
        },
        (err) => {
          this.$message({
            content: "服务器繁忙，请重新注册",
            type: "err",
          }).show();
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
.container-register {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .layout-header {
    margin-bottom: 1rem;
    .mod-header {
      padding: 0.5rem;
      background-color: green;
      color: #fff;
      .cell-header {
        position: relative;
        text-align: center;
        span:first-child {
          margin-top: -0.75rem;
          position: absolute;
          left: 0;
          top: 50%;
          font-size: 1.5rem;
        }
      }
    }
  }
  .layout-main {
    padding: 0 1rem;
    .mod-register-form {
      margin: 0 auto;
      width: 18.75rem;
      .cell-item {
        margin-bottom: 0.5rem;
        width: 100%;
        input {
          padding: 0 0.5rem;
          line-height: 2.5rem;
          font-size: 1rem;
          outline: none;
          border: none;
          width: 100%;
        }
        input[type="button"] {
          color: #fff;
          font-size: 1.125rem;
          background-color: green;
        }
        span {
          float: right;
          font-size: 1.125rem;
        }
      }
    }
  }
}
</style>