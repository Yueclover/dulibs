<template>
  <div class="loading">
    <ul>
      <li v-for="(item, index) in lis" :key="index"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      lis: [, , ,],
    };
  },
  mounted() {},
};
</script>

<style scoped>
.loading {
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:transparent;
  z-index: 10000;
}
.loading ul{
  display: flex;
   justify-content: center;
  align-items: center;
  width: 6.25rem;
  height: 6.25rem;
  background-color: rgba(0,0,0,.3);
}
.loading li {
  margin: 0 5px;
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: firebrick;
  /* background-image: linear-gradient(
    to top right,
    rgb(27, 209, 255),
    rgb(236, 29, 255)
  ); */
  list-style: none;
  animation: example 2.2s infinite linear;
}

.loading li:nth-child(2) {
  animation-delay: 0.8s;
}

.loading li:nth-child(3) {
  animation-delay: 1.6s;
}

@keyframes example {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(1.6);
    opacity: 0.6;
  }

  50% {
    transform: scale(2);
    opacity: 1;
  }

  75% {
    transform: scale(1.6);
    opacity: 0.6;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>