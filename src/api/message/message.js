import Vue from 'vue'
import Message from './Message.vue'
export default function message(props={}) {
    var vm = new Vue({
        render: h => h(Message,{props})
    }).$mount()
    document.body.appendChild(vm.$el)
    // console.log(vm.$children[0]);
    const component = vm.$children[0]; //用与挂载全局的alert提示，comp就相当于alert组件。
    component.remove = () => { //当执行remove()方法时，即从body上移除掉挂载的真实dom，并销毁虚拟dom
        document.body.removeChild(vm.$el);
        vm.$destroy(); //销毁虚拟dom
    }
    return component
}