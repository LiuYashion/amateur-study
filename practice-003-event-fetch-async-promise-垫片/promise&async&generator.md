# Generator
- 形式上： Generator函数是一个普通的函数，不过相对于普通函数多出了两个特征。一是在function关键字和函数明之间多了'*'号；二是函数内部使用了yield表达式，用于定义Generator函数中的每个状态。

- 语法上： Generator函数封装了多个内部状态(通过yield表达式定义内部状态)。执行Generator函数时会返回一个遍历器对象(Iterator对象)。也就是说，Generator是遍历器对象生成函数，函数内部封装了多个状态。通过返回的Iterator对象，可以依次遍历(调用next方法)Generator函数的每个内部状态。

- 调用上： 普通函数在调用之后会立即执行，而Generator函数调用之后不会立即执行，而是会返回遍历器对象(Iterator对象)。通过Iterator对象的next方法来遍历内部yield表达式定义的每一个状态。

## demo
yield表达式也有两种作用：定义内部状态和暂停执行

```js
function *gen () {
  let foo = yield 1
  foo = foo*2
  yield foo/2
  yield 50
  return 3
}

const g = gen()   // Iterator对象
g.next()          // {value: 1, done: false}
g.next(20)        // {value: 20, done: false}
g.next(20)        // {value: 50, done: true}
g.next()          // {value: 3, done: true}
g.next()          // {value: undefined, done: true}
```
从结果能看出，执行一次next状态就变化一次。

https://segmentfault.com/a/1190000012233339
https://juejin.im/post/5a6db41351882573351a8d72
