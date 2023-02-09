<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(item, index) in routerList"
        :key="index"
        @click="select(item.path)"
      >
        <span
          :class="[item.icon, $route.path === item.path ? selected : '']"
        ></span>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      routerList: [
        {
          title: "首页",
          path: "/home",
          icon: "icon-home",
        },
        {
          title: "分类",
          path: "/categroy",
          icon: "icon-list",
        },
        {
          title: "带你读",
          path: "/read",
          icon: "icon-book",
        },
        {
          title: "购物车",
          path: "/cart",
          icon: "icon-shopping-cart",
        },
        {
          title: "我的",
          path: "/my",
          icon: "icon-user",
        },
      ],
      selected: "colored",
    };
  },
  methods: {
    select(path) {
      if (this.$route.path === path) return;
      this.$router.push(path);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  background-color: #eee;
}
.tabbar ul {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 3.125rem;
}

.tabbar ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tabbar ul li [class^="icon"] {
  font-size: 1.5rem;
  color: #222;
}
.tabbar ul li span {
  font-weight: 500;
}
.tabbar ul li .colored {
  color: chocolate;
}
</style>