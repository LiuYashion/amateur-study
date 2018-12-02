# 错误监控
https://github.com/happylindz/blog/issues/5

### 1）window.onerror
这些都能监听js的error。window.onerror 捕获异常能力比 try-catch 稍微强点，无论是异步还是非异步错误，onerror 都能捕获到运行时错误。另外 onerror 是无法捕获到网络异常的错误。
```js
window.onerror = function (msg, url, row, col, error) {
    console.log('我知道错误了');
    console.log({
        msg,  url,  row, col, error
    })
    return true;
    //  返回 true 的时候，异常才不会向上抛出
    //  否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx
};
```


### 2）window.addEventListener('error')
由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。
```js
window.addEventListener('error', function(event) { 
    console.log(222, event)
}, true)
```


#### 3）try catch
try-catch 在我们的代码中经常见到，通过给代码块进行 try-catch 进行包装后，当代码块发生出错时 catch 将能捕捉到错误的信息，页面也将可以继续执行。但是 try-catch 处理异常的能力有限，只能捕获捉到运行时非异步错误，对于语法错误和异步错误就显得无能为力，捕捉不到。
```js
try {
  error    
  // 未定义变量 
} catch(e) {
  console.log('我知道错误了');
  console.log(e);
}
```


### 4）Promise / unhandledrejection
通过 Promise 可以帮助我们解决异步回调地狱的问题，但是一旦 Promise 实例抛出异常而你没有用 catch 去捕获的话，onerror 或 try-catch 也无能为力，无法捕捉到错误。因为你不知道什么时候这些异步请求会抛出异常而你并没有处理它，所以你最好添加一个 Promise 全局异常捕获事件 unhandledrejection。
```js
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('我知道 promise 的错误了');
  console.log(e.reason);
  return true;
});

Promise.reject('promise error');
new Promise((resolve, reject) => {
  reject('promise error');
});
new Promise((resolve) => {
  resolve();
}).then(() => {
  throw 'promise error'
});
```

### 5）错误上报方式
- 通过 Ajax 发送数据
- 动态创建 img 标签的形式
```js
function report(error) {
  var reportUrl = 'http://xxxx/report';
  new Image().src = reportUrl + 'error=' + error;
}
report(1010)
```


# 性能上报
```js
let { navigation , timing, timeOrigin  } = window.performance

```

# 拓展

### 1）Navigator.sendBeacon()
这是一个测试的功能。这个方法主要用于满足 统计和诊断代码 的需要，这些代码通常尝试在卸载（unload）文档之前向web服务器发送数据。过早的发送数据可能导致错过收集数据的机会。然而， 对于开发者来说保证在文档卸载期间发送数据一直是一个困难。因为用户代理通常会忽略在卸载事件处理器中产生的异步 XMLHttpRequest 。

为了解决这个问题， 统计和诊断代码 通常要在 unload 或者beforeunload 事件处理器中发起一个同步 XMLHttpRequest 来发送数据。同步的 XMLHttpRequest 迫使用户代理延迟卸载文档，并使得下一个导航出现的更晚。下一个页面对于这种较差的载入表现无能为力。

有一些技术被用来保证数据的发送。其中一种是通过在卸载事件处理器中创建一个图片元素并设置它的 src 属性的方法来延迟卸载以保证数据的发送。因为绝大多数用户代理会延迟卸载以保证图片的载入，所以数据可以在卸载事件中发送。另一种技术是通过创建一个几秒钟的 no-op 循环来延迟卸载并向服务器发送数据。

这些技术不仅有较差的编码模式，其中的一些甚至并不可靠而且会导致非常差的页面载入性能。

下面的例子展示了一个理论上的统计代码——在卸载事件处理器中尝试通过一个同步的 XMLHttpRequest 向服务器发送数据。这导致了页面卸载被延迟。
```js
window.addEventListener('unload', logData, false);

function logData() {
    var client = new XMLHttpRequest();
    client.open("POST", "/log", false); // 第三个参数表明是同步的 xhr
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(analyticsData);
}

// 这才是正确的姿势
window.addEventListener('unload', logData, false);

function logData() {
    navigator.sendBeacon("/log", analyticsData);
}
```

### 2）badjs
$ npm install badjs-report
```js
BJ_REPORT.init({
  id: 1,                                // 上报 id, 不指定 id 将不上报
  uin: 123,                             // 指定用户 id, (默认已经读取 qq uin)
  delay: 1000,                          // 延迟多少毫秒，合并缓冲区中的上报（默认）
  url: "//badjs2.qq.com/badjs",         // 指定上报地址
  ignore: [/Script error/i],            // 忽略某个错误
  random: 1,                            // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
  repeat: 5,                            // 重复上报次数(对于同一个错误超过多少次不上报)
                                        // 避免出现单个用户同一错误上报过多的情况
  onReport: function(id, errObj){},     // 当上报的时候回调。 id: 上报的 id, errObj: 错误的对象
  submit: null,                         // 覆盖原来的上报方式，可以自行修改为 post 上报等
  ext: {},                              // 扩展属性，后端做扩展处理属性。例如：存在 msid 就会分发到 monitor,
  offlineLog : false,                   // 是否启离线日志 [默认 false]
  offlineLogExp : 5,                    // 离线有效时间，默认最近5天
});
```

### 3）sentry

### 4）实践
http://fex.baidu.com/blog/2014/05/build-performance-monitor-in-7-days/

### 5）最佳实践
https://mp.weixin.qq.com/s/YiKRY_LDURY0uONtEhkUfg 值得阅读