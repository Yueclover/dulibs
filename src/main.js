import Vue from 'vue'//引入vue构造函数
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import message from '@/api/message/message.js'
import dialog from '@/api/dialog/dialog.js'
import loading from '@/api/loading/loading.js'
const VueTouch = require('vue-touch')

Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.prototype.$dialog = dialog
Vue.prototype.$loading = loading
Vue.prototype.$store = store
// 公共css文件
import '@/assets/style.css'
import '@/assets/icomoon/style.css'
// import vueConfig from 'vue.config'
const vm =  new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  
  // store,
}).$mount('#app')
// vm为VUE实例
// console.log(vm);
export default vm
