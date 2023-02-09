import Vue from'vue'
import Loading from '@/api/loading/Loading.vue'
export default function loading(props={isshow:true}){
    const VmConstructor = Vue.extend({
        render:h=>h(Loading,{props}),
    })
    const vmchild = new VmConstructor().$mount('#pop-up')
    return vmchild
}