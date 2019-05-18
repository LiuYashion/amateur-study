
# JS运行机制
js是单线程的，基于事件循环的：

- 同步任务在主线程执行，形成一个【栈stack】

- 异步任务，会放在【异步处理模块】，异步达到触发条件，就会被推入【任务队列quque】
  
- 栈执行完毕，就读取任务队列。结束的异步任务，进入stack，开始执行

- 然后重复执行上面一步



# macro task | micro task
他们都是异步任务

- macro task 宏任务
  
  script（全局任务）, setTimeout, setInterval, setImmediate, I/O, UI rendering

- micro task 微任务
  
  process.nextTick, Promise

主线程的执行过程就是tick，所有异步结果通过queue调度，queue中存放的是一个个的任务task


```js
console.log('script start');

// 宏任务
setTimeout(function() {
  console.log('setTimeout');
}, 0);

// 微任务
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// "script start"
// "script end"
// "promise1"
// "promise2"
// "setTimeout"
```
## 不要忘记script也是一个宏任务！，所以上面的代码 settimeout会最后执行

可以看出，Promise的异步优于setTimeout执行。

原因就是：每次循环中，macro task只会提取一个执行，而micro task会一直提取，一直到队列清空



# event loop 事件循环进程模型


// 选择一个宏任务 T

```
Macro Task {

  1. 设置当前任务为T
  2. 运行任务T
  3. 设置当前任务为 null
  4. 将T从任务队列移除

  Micro Task {

    4.1. 设置当前任务为K
    4.2. 运行任务K
    4.3. 设置当前任务为 null
    4.4. 将K从microtask queue移除
    4.5. 重复4.1
  }

  5. 渲染页面
  6. 重复第一步

}
```

我们可以发现，每次macro task的任务执行完后，UI都会重新渲染，那么如果我们在micro task完成数据更新，task结束后就能得到最新的UI了。反之如果在macro task中新建一个task来更新，显然我们会更新两次。