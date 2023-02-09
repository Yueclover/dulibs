<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "App",
  components: {
    // Loading,
    // Test,
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
    }),
  },
  methods: {
    ...mapMutations([
      "innitUserLoginInfo",
      "initCartList",
      "initOrderList",
      "initSearchHistory",
      "initSelectAddress"
    ]),
  },
  created() {
    this.innitUserLoginInfo();
    this.initCartList();
    this.initOrderList();
    this.initSearchHistory();
    this.initSelectAddress()
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #eee;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>