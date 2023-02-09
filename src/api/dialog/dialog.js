import Vue from 'vue' 
import Dialog from './Dialog.vue'
export default function dialog(props={el:'#pop-up'}){
    var VueChild = Vue.extend({
        render:h=>h(Dialog,{props}),
    })
    var vc = new VueChild().$mount(props.el)
    // document.body.appendChild(component.$el)
    const c = vc.$children[0]
    return c
}