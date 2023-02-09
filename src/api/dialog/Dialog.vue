<template>
  <div class="layout-dialog">
    <div class="mod-dialog" v-if="isshow">
      <div class="alert-pannel">
        <div class="header">
          <span>提示</span>
          <span @click="hidenPannel">×</span>
        </div>
        <p>确认删除吗</p>
        <div class="btn">
          <button class="sure" @click="deleteGood">确定</button>
          <button class="cancel" @click="hidenPannel">取消</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { deleteCart } from "@/api/axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Dialog",
  props: {
    el: {
      type: String,
    },
    content: {
      //消息内容
      type: String,
      default: "",
    },
    deleteItem: {
      type: Function
    },
    objparamter:{
      type:Object
    },
    arrparamter:{
      type:Array
    },
    goodsArr: [],
  },
  data() {
    return {
      isshow: true
    };
  },
  computeds: {
    ...mapState({
      selectList: (state) => state.cartList.selectList,
    }),
  },
  methods: {
    // ...mapMutations(["deleteItem"]),
    showPannel() {
      if (this.goodsArr) {
        this.isshowalert = true;
      } else {
        this.$message({
          content: "请选择商品",
          type: "warn",
        }).show();
      }
    },
    hidenPannel() {
      this.isshow = false
      this.$nextTick(() => {
        this.$destroy();
      })
    },
    async deleteGood() {
      if(this.arrparamter === undefined){
        await this.deleteItem(this.objparamter)
      }else{
        await this.deleteItem(this.arrparamter)
      }
      this.hidenPannel()
    }
  },
};
</script>

<style scoped lang="scss">
.layout-dialog {
  .mod-dialog {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color:transparent;
    .alert-pannel {
      margin:0 auto;
      padding: 0.625rem;
      height: 16.25rem;
      width: 18.75rem;
      // z-index: 1000;
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
}
</style>