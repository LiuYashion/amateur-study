
# Vue.js


# dom中与height有关的属性



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

Vue Directive的生命周期方法能让我们更优雅的去在合适的时机进行DOM的操作，而在ViewModel里则没有和DOM元素对应的方法。因为Vue Directive是属于View层面的，所以DOM操作应该被封装在Vue Directive里而不是出现在Vue实例中。 

下面我们实操一个vue directive的操作，我们来自制scroll指令,

```js

<div class="hello" v-scroll="onScroll">
</div>

import scrollDirective from '../directives/scroll'
...
directives: {
  scroll: scrollDirective
}

let callBackWarpped // 保存引用
let scrollCallback = function(callback, element) {
  if (element.scrollTop + element.clientHeight + 10 >= element.scrollHeight) {
    callback('bottom')
  } else {
    callback()
  }
}

export default {
  bind: function(el, binding, vnode) {
    callBackWarpped =  scrollCallback.bind({}, binding.value, el)
    el.addEventListener("scroll", callBackWarpped)
  },
  unbind: function() {
    el.removeEventListener("scroll", callBackWarpped)
  }
}
```

# 过滤器
对value的一些处理,对于v-model我们使用compute计算属性
```js
// <p>{{inputValue | toRMB }}</p>
export default {
  name: 'HelloWorld',
  data(){
    return {
      phoneNumber:'',
      mailAddr:'',
      message: '',
      inputValue: ''
    }
  },
  filters: {
    toRMB: function (value) {
      return `￥${value}`
    }
  }
}
// 这样就能展示
```


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


# extend（全局api）
构造一个vue子类

vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。

> 可以问问compiler和runtime有什么区别

```js
<div id="mount-point"></div>

// 创建构造器
import Vue from 'vue/dist/vue.js'
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```


# nextTick（全局api）
就是下一次vue视图更新的回调,支持promise
```js
this.$nextTick().then(()=>{
  console.log('sdfsdfdf')
})
```

# plugins
插件也是通过vue.use()使用,这里列举下插件的用处

https://zhuanlan.zhihu.com/p/29087779

- 添加全局||实例方法,属性
```js
export default {
  // 全局方法或属性
  install(Vue, options) {
    Vue.$myName = '劳卜';
  },
  // 实例方法或属性
  install(Vue, options) {
    Vue.prototype.$myName = '劳卜';
    Vue.prototype.showMyName = value => {
      console.log(value);
    };
  }
}
```

- 添加全局资源（指令/过滤器/过渡）

这里先写一个loading插件

```js
import LoadingComponent from '../components/loading.vue'

let $vm

export default {
  install(Vue, options) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(LoadingComponent);
      $vm = new LoadingPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }

    $vm.show = false;

    let loading = {
      show(text) {
        $vm.show = true;
        $vm.text = text;
      },
      hide() {
        $vm.show = false;
      }
    };

    if (!Vue.$loading) {
      Vue.$loading = loading;
    }

    // Vue.prototype.$loading = Vue.$loading;

    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    })
  }
}
```