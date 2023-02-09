<template>
  <div class="my-info">
    <header>
      <span class="icon-angle-left" @click="goback"></span>
    </header>
    <section>
      <h1 class="title">安全中心</h1>
      <div class="myinfo-container">
        <ul>
          <li @click="changeNickname">
            <div>昵称</div>
            <div>
              <span class="red-fontcolor left">修改</span>
              <span class="icon-angle-right"></span>
            </div>
          </li>
          <li>
            <div>
                <span>头像</span>
                <span class="bottom">为保证展示效果，请上传1:1尺寸头像</span>
            </div>
            <div>
              <img :src="userInfo.imgUrl===null ? 'logo2.png' :'' " alt="" class="userimg left" />
              <span class="icon-angle-right"></span>
            </div>
          </li>
          <li>
            <div>手机号</div>
            <div>
              <span class="c-fontcolor left">{{userInfo.tel}}</span>
              <span class="icon-angle-right"></span>
            </div>
          </li>
          <li>
            <div>支付密码</div>
            <div>
              <span class="red-fontcolor left">设置</span>
              <span class="icon-angle-right"></span>
            </div>
          </li>
          <li>
            <div>允许个性化设置</div>
            <div></div>
          </li>
          <li>
            <div>
                <span>注销账号</span>
                <span class="bottom">注销账号将清空所有虚拟资产</span>
            </div>
            <div>
              <span class="red-fontcolor left">申请注销</span>
              <span class="icon-angle-right"></span>
            </div>
          </li>
          <li>
            <div>隐私规则说明</div>
            <div>
              <span class="icon-angle-right"></span>
            </div>
          </li>
          <li @click="loginOut">
            <div>退出登录</div>
            <div>
              <span class="icon-angle-right"></span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  name: "MyInfo",
  computed:{
    ...mapState({
        userInfo:state=>state.user.userInfo
    })
  },
  methods:{
    ...mapMutations(["setLoginOut"]),
    goback(){
        this.$router.go(-1)
    },
    loginOut(){
      // 清除所有的localStorage
      this.setLoginOut()
      localStorage.clear()
      this.$router.push({
        name:'My'
      })
    },
    // 修改昵称
    changeNickname(){},
  }
};
</script>

<style scoped lang="scss">
.my-info {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #ccc;
  header {
    padding: 0.5rem;
    font-size: 1.625rem;
    background-color: #fff;
  }
  section {
    height: calc(100vh - 3.125rem);
    overflow: auto;
    background-color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    h1 {
      padding-left: 0.625rem;
      height: 4.6875rem;
      line-height: 4.6875rem;
      font-size: 1.5rem;
      background-color: #fff;
    }
    .myinfo-container {
      padding-top: 0.625rem;
      background-color: #ccc;
      li {
        padding: 1rem 0.625rem;
        display: flex;
        justify-content: space-between;
        font-size: 1.25rem;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        &>div:nth-child(1){
            display: flex;
            flex-direction: column;
            max-width:60%;
            .bottom{
                padding-top:.5rem;
                font-size: 1rem;
                color:#888;
            }
        }
        & > div:nth-child(2) {
          display: flex;
          align-items: center;
          font-size: 1rem;
          .left {
            margin-right: 0.5rem;
          }
          .red-fontcolor {
            color: red;
          }
          .c-fontcolor {
            color: #ccc;
          }
          .userimg{
            height: 3.75rem;
            width: 3.75rem;
            border-radius: 50%;
          }
        }
        .icon-angle-right {
          font-size: 1.5625rem;
        }
      }
    }
  }
}
</style>