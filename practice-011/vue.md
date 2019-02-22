
# Vue.js

# directives
除了核心功能默认内置的指令 (v-model 和 v-show),Vue 也允许注册自定义指令

- bind: 只会调用一次,指令第一次绑定到元素时调用
- inserted: 被绑定的元素插入父节点时调用
- update: 组件更新时调用
- componentUpdated
- unbind

下面是这些钩子函数的入参( el, binding, vnode, oldVnode )

- el: 指令所绑定的元素,可以用来直接操作 DOM
- binding:  一个对象
- vnode:  虚拟节点 (查看具体文档)
- oldVnode: 上一个虚拟节点

指令还支持直接输入对象字面量



# vue.use()

- 可以用于注册组件
```js
import button from './button.vue';
import input from './input.vue';

const components = {
  install: function install(Vue) {
    Vue.component('button-counter', button);
    Vue.component('lyx-input', input);
  },
};

export default components;
//////////////
Vue.use(AnqComponent)
```

# mixins
混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时,所有混入对象的选项将被混入该组件本身的选项

- data: 会以浅复制的方式合并,同名属性组件内的会覆盖掉mixin的
- 钩子函数: 会合并成一个数组,混入的钩子将在自身钩子之前调用
- methods,components,directives等对象类型:  合并为一个对象,同名的组件内优先级更高

全局混入! 需要注意 (使用恰当时,可以为自定义对象注入处理逻辑),然而大部分时间插件就够用了


# 恰当的使用JSX模板
在template中写太多的if else并不是一个好的选择,我们来尝试一下在render中处理



# plugins
插件也是通过vue.use()使用,这里列举下插件的用处

https://zhuanlan.zhihu.com/p/29087779

- 添加全局方法,属性


- 添加全局资源: 指令/过滤器/过渡
