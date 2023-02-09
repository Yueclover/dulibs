<template>
  <div class="container-read">
    <div class="layout-main">
        这是read
    </div>
    <div class="layout-tabbar">
        <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
    name:'Read',
    components:{
        Tabbar,
    }
}
</script>

<style>

</style>