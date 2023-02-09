<template>
  <div class="login">
    <header>
      <span class="icon-angle-left" @click="goback"></span>
      <span>登录</span>
      <span></span>
    </header>
    <section>
      <div class="login-form">
        <div class="tel-input form-col">
          <input
            type="text"
            name=""
            v-model="tel"
            id="tel"
            placeholder="请输入手机号"
          />
        </div>
        <div class="msg-input form-col" v-if="isshow">
          <input
            type="text"
            name=""
            id="email"
            placeholder="请输入短信验证码"
          />
          <input type="button" value="获取短信验证码" />
        </div>
        <form class="msg-input form-col" v-else>
          <input
            type="password"
            name=""
            v-model="psd"
            id="psd"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </form>
        <input type="button" class="form-col" value="登录" @click="login" />
      </div>

      <div class="login-tab">
        <li @click="pwdLogin" v-if="isshow">
          <span></span>
          <span>密码登录</span>
        </li>
        <li @click="msgLogin" v-else>
          <span></span>
          <span>短信验证码登录</span>
        </li>
        <li>
          <span></span>
          <span @click="goRegister">快速注册</span>
        </li>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { login , getMyAddress } from "@/api/axios";
export default {
  name: "Login",
  data() {
    return {
      isshow: false,
      tel: "",
      psd: "",
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
  computed:{
    ...mapState({
       myAddress: (state) => state.address.myAddress,
    })
  },
  methods: {
    ...mapMutations(["setLoginInfo","setMyAddress"]),
    goback() {
      this.$router.go(-1);
    },
    goRegister() {
      this.$router.push({
        name: "Register",
      });
    },
    pwdLogin() {
      this.isshow = false;
    },
    msgLogin() {
      this.isshow = true;
    },
    login() {
      // 前端验证
      let psd = this.validate("psd");
      let tel = this.validate("tel");
      if (!tel) {
        this.$message({
          content: this.rules.tel.msg,
          type: "err",
        }).show();
      } else if (!psd) {
        this.$message({
          content: this.rules.psd.msg,
          type: "err",
        }).show();
      } else {
        //  发送请求，后端验证
        this.sendLoginAxios();
      }
    },
    sendLoginAxios() {
      login(this.tel, this.psd).then(
        (res) => {
          if (res.data.code === 0) {
            this.$message({
              content: "用户不存在",
              type: "err",
            }).show();
          }else if (res.data.code === 1) {
            this.$message({
              content: "密码错误",
              type: "err",
            }).show();
          }else {
            localStorage.clear()
            this.setLoginInfo({
              userInfo: res.data.data.userInfo,
              token: res.data.data.token,
              refreshToken:res.data.data.refreshToken
            });
            this.$message({
              content: "登录成功",
              type: "success",
            }).show();
            // getMyAddress(res.data.data.userInfo.uid).then(
            //   (res) => {
            //     this.setMyAddress(res.data.data);
            //   },
            // );
            setTimeout(() => {
              this.$router.push("/My");
            }, 3000);
          }
        },
        (err) => {
          this.$message({
            content: err.message,
            type: "err",
          }).show();
        }
      );
    },
    validate(key) {
      return this.rules[key].reg.test(this[key]);
    },
    msg() {
      this.$message({ content: "成功1111111111111", type: "err" }).show();
    },
  },
};
</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  border: 1px solid #bbb;
}
input[type="button"] {
  background-color: firebrick;
  color: #fff;
}
.login {
  header {
    padding: 0.625rem;
    justify-content: space-between;
    display: flex;
    color: #fff;
    background-color: firebrick;
    font-size: 1.25rem;
    span:nth-child(2) {
      font-size: 1rem;
    }
  }
  section {
    padding: 2.5em 1.25rem;
    .login-form {
      display: flex;
      flex-direction: column;
      .form-col {
        margin-bottom: 1rem;
      }
      .msg-input {
        display: flex;
        input[type="text"] {
          flex: 1 1 auto;
        }
        input[type="button"] {
          padding: 0.5rem 0.3125rem;
          flex: 0 0 auto;
          width: 7.625rem;
          border: none;
        }
      }
    }
    .login-tab {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>