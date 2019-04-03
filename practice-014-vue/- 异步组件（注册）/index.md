## 常规注册
```js
import button from './button.vue';
import input from './input.vue';

const components = {
  install: function install(Vue) {
    Vue.component('button-counter', button);
    Vue.component('lyx-input', input);
  },
};
```


## 异步注册
```js
Vue.component('async-example', function (resolve, reject) {
   require(['./my-async-component'], resolve)
})
```

https://www.zhihu.com/question/56820346
