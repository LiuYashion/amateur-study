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

Vue.use(components)
```


## require/exports | import/export
exports是对module.exports的引用，这是CommonJS的规范
```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
```


```js
/**
 * export
 */
// 写法1
export const str = 'string';
export function log(str) {}
// 写法2，这两种写法是一样的
export { str, log }

import { str, log } from 'a.js'

/**
 * export default
 * 这样不需要知道a.js中定义的模块名
 */
const str = 'string'
export default str
import strMdl from 'a.js'

/**
 * 别名引入，当方法名冲突的时候
 */
import { speak as cowSpeak } from 'cow.js'
import { speak as catSpeak } from 'cat.js'
cowSpeak()
/**
 * 别名引入，需要引入的方法太多了，每个as就很麻烦了
 */
import * as cowSpeak from 'cow.js'
cowSpeak.speak()

```

## 异步注册
这里是CommonJS规范，我们来看看这个异步组件注册的方式，所有异步组件的渲染，都在resolveAsyncComponent中
```js

// 普通异步组件
Vue.component('async-example', (resolve, reject) => {
   require(['./my-async-component'], resolve)
})

// Promise异步组件
Vue.component('async-webapck-example', () =>
  import('./my-async-component')
)

// 高级异步组件
Vue.component('async-example', () => ({
  component: import('./MyComp.vue'),  // 需要加载的组件。应当是一个 Promise
  loading: LoadingComp,               // 加载中应当渲染的组件
  error: ErrorComp,                   // 出错时渲染的组件
  delay: 200,                         // 渲染加载中组件前的等待时间。默认：200ms。
  timeout: 3000                       // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
}))



```
