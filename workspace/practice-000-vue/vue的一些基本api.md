
# Vue.js


# directives（自定义指令）
除了核心功能默认内置的指令 (v-model 和 v-show),Vue 也允许注册自定义指令

- bind: 只会调用一次,指令第一次绑定到元素时调用
- inserted: 被绑定的元素插入父节点时调用
- update: 组件更新时调用
- componentUpdated
- unbind

下面是这些钩子函数的入参( el, binding, vnode, oldVnode )

- el: 指令所绑定的元素,可以用来直接操作 DOM
- binding:  一个对象，包含了dom中指令的一些参数

  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }

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

// scroll；
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
  unbind: function(el) {
    el.removeEventListener("scroll", callBackWarpped)
  }
}
```










# 过滤器
对value的一些处理,对于v-model我们使用compute计算属性
```html
<p>{{inputValue | toRMB }}</p>

<div v-bind:id="rawId | formatId"></div>
```
```js
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
// 或者全局定义

Vue.filter('toRMB', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```


# vue.use()
安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

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

- data： 会以浅复制的方式合并，同名属性组件内的会覆盖掉mixin的
- 钩子函数： 会合并成一个数组，混入的钩子将在自身钩子之前调用
- methods，components，directives等对象类型： 合并为一个对象,同名的组件内优先级更高

全局混入! 需要注意 (使用恰当时,可以为自定义对象注入处理逻辑)，然而大部分时间插件就够用了（即，你一般用不到它）

```js
let minx = {
  data(){
    return {
      test: '？？？？？'
    }
  }
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {}
  },
  mixins:[minx]
};
```


# 恰当的使用JSX模板
在template中写太多的if else并不是一个好的选择，我们来尝试一下在render中处理。在.vue文件中，我们直接不写template即可，因为vue-loader会自动将template转成render
```js

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {

    }
  },
  mixins:[minx],
  render: function (createElement) {
    return createElement(
      'h' + 3,
      {},
      [
        createElement('h1', '一则头条'),
        createElement('h3', '一则头条'),
        createElement('h5', '一则头条'),
      ]
    )
  }
};
```
上面就是，在创建一个h3，并在里面插入h1,h3,h5



# extend（全局api）
使用基础 Vue 构造器，创建一个"子类"。

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
就是下一次vue视图更新的回调，支持promise，涉及到一些dom操作的，应该放在这个里面
```js
this.$nextTick().then(()=>{
  console.log('sdfsdfdf')
})
```


https://zhuanlan.zhihu.com/p/29087779

# plugins
插件也是通过vue.use( )使用,这里列举下插件的用处

**1. 添加全局 || 实例方法,属性**
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

**2. 添加全局资源（指令 / 过滤器 / 过渡）**

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
