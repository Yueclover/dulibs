<template>
  <transition name="fade" v-if="isShow">
      <!-- //success warn err default -->
    <div class="tip-box" 
    :class="{'success':type =='success' ,'warn':type =='warn' ,'err':type =='err','default':type =='default'}" v-if="isShow">
        <div class="tip-box-content">
            {{content}}
        </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Message",
  props:{
      content:{//消息内容
          type:String,
          default:'',
      },
      type:{//显示类型  success warn err default
          type:String,
          default:'default',//success warn err default
      },
      timer:{//显示时间
          type:Number,
          default:1000,
      }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {//组件显示方法
      this.isShow = true;
      setTimeout(this.hide, this.timer);
    },
    hide() {//组件隐藏方法
      this.isShow = false;
      this.remove(); //当被挂载在create.js上是，this.remove()即执行comp.remove()，即从body上移除掉挂载的真实dom，并销毁虚拟dom
    }
  }
};
</script>
<style lang="scss" scoped>
.tip-box {
  position: fixed;
  left:50%;
  top:50%;
  padding: 1.25rem .625rem;
  margin-left:-6.25rem;
  width:12.5rem;
  font-size: 14px;
  border-radius: 10px;
  letter-spacing: 1px;
  text-align: center;
  z-index: 9999;
  color: #fff;
  .tip-box-content{
      width: 90%;
      margin: 0 auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.success{
    background: #67C23A;
} 
.warn{
    background: #E6A23C;

} 
.err{
    background: #e24747;

} 
.default{
    background: #909399;

}
</style>
