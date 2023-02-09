<template>
  <div class="mod-buy">
    <div class="cell-item cell-shop">
      <span class="icon-shop"></span>
      <span>店铺</span>
    </div>
    <div class="cell-item cell-favorites">
      <span class="icon-heart-o"></span>
      <span>收藏</span>
    </div>
    <div class="cell-item cell-cart" @click="goCart">
      <span class="icon-shopping-cart"></span>
      <span>购物车</span>
    </div>
    <div class="cell-item cell-btn">
      <button class="buy-now">立即购买</button>
      <button class="add-cart" @click="addToCart">加入购物车</button>
    </div>
  </div>
</template>

<script>
import { updateCart, myCart } from "@/api/axios";
// import { mapState, mapMutations } from "vuex";
export default {
  name: "Buy",
  props: ["bookItem"],
  computed: {
  },
  methods: {
    // ...mapMutations(["setCartList"]),
    goCart() {
      this.$router.push("/cart");
    },
    addToCart() {
      // 业务逻辑
      // 发送axios，存储在数据库
      updateCart({
        uid: 1,
        gid: this.bookItem.gid,
      }).then(() => {
         this.$message({
          content: '加入购物车成功',
          type: "success",
        }).show();
      },
      ()=>{
        this.$message({
          content: '加入购物车失败',
          type: "err",
        }).show();
      });
    },
  },
};
</script>

<style scoped lang="scss">
%display-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
%font-style {
  font-size: 0.75rem;
  color: #999;
  font-weight: lighter;
}
.mod-buy {
  padding: 0.625rem 0;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 4.375rem;
  border-top-right-radius: 0.625rem;
  border-top-left-radius: 0.625rem;
  background-color: #fff;
  .cell-item {
    padding: 0 0.625rem;
  }
  .cell-shop,
  .cell-favorites,
  .cell-cart {
    @extend %display-flex;
    flex-shrink: 0;
    span:nth-child(1) {
      font-size: 1.875rem;
    }
    span:nth-child(2) {
      @extend %font-style;
    }
  }
  .cell-btn {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      padding: 0.625rem 1rem;
      color: #fff;
      font-size: 0.875rem;
      border-radius: 1.5625rem;
    }
    .buy-now {
      background-color: orange;
    }
    .add-cart {
      background-color: red;
    }
  }
}
</style>