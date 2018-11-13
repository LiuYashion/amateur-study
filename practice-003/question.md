### 设计模式
不要过分纠结 `发布/订阅模式` 和 `观察者模式` 的区别，这两个模式是非常相似的，也有不少文章将这两个模式统称为观察者模式，大家可以通过 exercise17 感受一下

* https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
* https://www.cnblogs.com/lovesong/p/5272752.html
* 发布/订阅模式
* 观察者模式
* 完成练习 https://github.com/FE-star/exercise17

### 事件模型、事件处理机制
* https://developer.mozilla.org/en-US/docs/Web/API/Event
* https://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture
* http://javascript.ruanyifeng.com/dom/event.html
* 思考：自定义事件的应用场景？

### 事件代理和委托
* https://zhuanlan.zhihu.com/p/26536815
* 思考：事件代理和委托的优缺点？

### AJAX & fetch
* https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX
* https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
* https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
* 思考：有 xhr 为什么还要 fetch？
* 扩展：了解 https://github.com/axios/axios 的实现（有时间可以看看源码）

### 异步流程控制
了解 `callback hell` 是如何产生的，以及 `Promise + async/await` 为什么能避免回调地狱

#### callback
* 了解一下回调和回调地狱 http://callbackhell.com/
* 了解一下 node 的 error first

#### Promise + async/await
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

#### callbackify & promisify
思考一下：如何实现 `callback` 和 `promise` 的互相转换

* https://nodejs.org/dist/latest-v9.x/docs/api/util.html#util_util_callbackify_original
* https://nodejs.org/dist/latest-v9.x/docs/api/util.html#util_util_promisify_original
* https://github.com/nodejs/node/blob/e3d05a61215b2958cc1951759e08e816b35f5027/lib/internal/util.js#L255-L290
* https://github.com/nodejs/node/blob/e3d05a61215b2958cc1951759e08e816b35f5027/lib/util.js#L370-L395

#### 扩展知识，了解即可
Generator + function*

* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A

RxJS

* http://reactivex.io/rxjs/
* [joeyguo/blog#11](https://github.com/joeyguo/blog/issues/11)

