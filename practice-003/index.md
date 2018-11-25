# 设计模式
https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript

# 发布订阅模式 、观察者模式
观察者模式：目标通知观察者，观察家进行update
```js
//观察者列表
function ObserverList(){
  this.observerList = [];
}
ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};

//目标
function Subject(){
  this.observers = new ObserverList();
}
Subject.prototype.notify = function( context ){
  this.observers.get(i).update( context );
};

//观察者
function Observer(){ 
  this.update = function(){
    // ...
  };
}
```

发布/订阅模式：发布订阅会有一个统一的轮询
```js

var pubsub = {};
(function(myObject) {

    var lists = {};

    var subUid = -1;

    myObject.publish = function( topic, args ) {
        if ( !lists[topic] ) {
            return false;
        }
        var subscribers = lists[topic],
            len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func( topic, args );
        }
        return this;
    };

    myObject.subscribe = function( topic, func ) {
        if (!lists[topic]) {
            lists[topic] = [];
        }
        var token = ( ++subUid ).toString();
        lists[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    myObject.unsubscribe = function( token ) {
        for ( var m in lists ) {
            if ( lists[m] ) {
                for ( var i = 0, j = lists[m].length; i < j; i++ ) {
                    if ( lists[m][i].token === token ) {
                        lists[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));
```

# 事件模型、事件处理机制
https://developer.mozilla.org/en-US/docs/Web/API/Event
https://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture
http://javascript.ruanyifeng.com/dom/event.html
思考：自定义事件的应用场景？

# 事件的冒泡与捕获

### 1）preventDefault，stopPropagation，stopImmediatePropagation
事件的传递顺序是：body->div3->div2->div1->div2->div3->body，捕获然后冒泡。stopPropagation是用来切换这个传递顺序的，所以阻止捕获还是冒泡，需要你自己判断好。对于循环中间的一环div1，如果同时注册了捕获和冒泡，那么两个方法都会触发。这时候可以用stopImmediatePropagation，阻止其他相同事件的监听。
```html
<body>
  <div id='3'>
      3
      <div id='2'>
          2
          <div id='1'>
              1
          </div>
      </div>
  </div>
</body>
<script>

// 设置为true，在【捕获】阶段触发
document.getElementById('1').addEventListener('click', function(e){
    console.log(`#1 click~`)
    e.stopPropagation()
    e.stopImmediatePropagation();
}, true)
document.getElementById('2').addEventListener('click', function(e){
    console.log(`#2 click~`)
    // e.stopPropagation()
}, true)
document.getElementById('3').addEventListener('click', function(e){
    console.log(`#3 click~`)
    // e.stopPropagation()
}, true)



document.getElementById('1').addEventListener('click', function(e){
    console.log(`#1 click`)
    e.stopPropagation()
    // e.stopImmediatePropagation();
}, false)
document.getElementById('2').addEventListener('click', function(e){
    console.log(`#2 click`)
    // e.stopPropagation()
}, false)
document.getElementById('3').addEventListener('click', function(e){
    console.log(`#3 click`)
    // e.stopPropagation()
}, false)

</script>
```


### 2）axios
先看一个简单的示例，可以发现类似于jq.ajax一样
```js
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
}).then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```
再来看一些概念：

- Interceptors（拦截器）

  都类似于中间件，管道。对返回值进行处理。
  ```js
  // 增加一个请求拦截器，注意是2个函数，一个处理成功，一个处理失败
  axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    // 请求错误后处理
    return Promise.reject(error);
  });

  // 增加一个响应拦截器
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
  ```

### 3）axios的各个模块
- HTTP请求模块
```js
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  // 其他源码
  // default adapter是一个可以判断当前环境来选择使用Node还是XHR进行请求发送的模块
  var adapter = config.adapter || defaults.adapter; 
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    // 其他源码
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      // 其他源码
      return Promise.reject(reason);
    });
  };
}

function getDefaultAdapter() {
  var adapter;
  // 只有Node.js才有变量类型为process的类
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // Node.js请求模块
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // 浏览器请求模块
    adapter = require('./adapters/xhr');
  }
  return adapter;
}
```


- 拦截器模块

  - chain是一个执行队列。这个队列的初始值，是一个带有config参数的Promise。
  - 在chain执行队列中，插入了初始的发送请求的函数dispatchReqeust和与之对应的undefined。后面需要增加一个undefined是因为在Promise中，需要一个success和一个fail的回调函数，这个从代码promise = promise.then(chain.shift(), chain.shift());就能够看出来。因此，dispatchReqeust和undefined我们可以成为一对函数。
  - 在chain执行队列中，发送请求的函数dispatchReqeust是处于中间的位置。它的前面是请求拦截器，通过unshift方法放入；它的后面是响应拦截器，通过push放入。要注意的是，这些函数都是成对的放入，也就是一次放入两个。


了解了dispatchRequest实现的HTTP请求发送模块，我们来看下axios是如何处理请求和响应拦截函数的。让我们看下axios中请求的统一入口request函数。
```js
Axios.prototype.request = function request(config) {
  // 其他代码
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
};
```
  


- 取消请求模块

首先，让我们来看下元数据Cancel类。它是用来记录取消状态一个类，具体代码如下：
```js
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

// 而在CancelToken类中，它通过传递一个Promise的方法来实现了HTTP请求取消，然我们看下具体的代码：
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

// 而在adapter/xhr.js文件中，有与之相对应的取消请求的代码：
if (config.cancelToken) {
  // 等待取消
  config.cancelToken.promise.then(function onCanceled(cancel) {
    if (!request) {
      return;
    }

    request.abort();
    reject(cancel);
    // 重置请求
    request = null;
  });
}

```
# axios的设计有什么值得借鉴的地方
### 1）发送请求函数的处理逻辑
在之前的章节中有提到过，axios在处理发送请求的dispatchRequest函数时，没有当做一个特殊的函数来对待，而是采用一视同仁的方法，将其放在队列的中间位置，从而保证了队列处理的一致性，提高了代码的可阅读性。

### 2）Adapter的处理逻辑
在adapter的处理逻辑中，axios没有把http和xhr两个模块（一个用于Node.js发送请求，另一个则用于浏览器端发送请求）当成自身的模块直接在dispatchRequest中直接饮用，而是通过配置的方法在default.js文件中进行默认引入。这样既保证了两个模块间的低耦合性，同时又能够为今后用户需要自定义请求发送模块保留了余地。

### 3）取消HTTP请求的处理逻辑
在取消HTTP请求的逻辑中，axios巧妙的使用了一个Promise来作为触发器，将resolve函数通过callback中参数的形式传递到了外部。这样既能够保证内部逻辑的连贯性，也能够保证在需要进行取消请求时，不需要直接进行相关类的示例数据改动，最大程度上避免了侵入其他的模块。



# 事件代理和委托
[知乎专栏](https://zhuanlan.zhihu.com/p/26536815)


# AJAX
XMLHttpRequest是ajax的核心

### 1）Server-sent events
服务器端向网页端传输数据

### 2）Sending and Receiving Binary Data
设置XMLHttpRequest对象的responseType属性以改变从服务器端获取的预期响应

### 3）The FileReader API
FileReader API允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓存）的内容


# XMLHttpRequest
一个简单的request
```js
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;

oReq.open("post", "https://q.crfchina.com/qqagent/baseRqt/get_laonData", true);
oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
oReq.send('{"openId":"123456","ticket":"default"}');

// {
//     "openId":"123456",
//     "result":"0078",
//     "errMsg":"不合法的请求!",
//     "resJson":null,
//     "ticket":null,
//     "servicetype":"get_laonData"
// }
```

### 1）具体的api



# Fetch
### 1）具体的api

### 2）fetch对比xhr的优点
XMLHttpRequest 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 同构方便，使用 isomorphic-fetch


# 异步流程控制
Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及其返回的值。我们把他当成一个，绑定了回调的对象。
```js
// 成功的回调函数
function successCallback(result) {
  console.log("声音文件创建成功: " + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("声音文件创建失败: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback)

const promise = createAudioFileAsync(audioSettings); 
promise.then(successCallback, failureCallback);
// 或者
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```

我们再来对比看看async/await
```js
doSomething()
.then(result => doSomethingElse(value))
.then(newResult => doThirdThing(newResult))
.then(finalResult => console.log(`Got the final result: ${finalResult}`))
.catch(failureCallback);

try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```

### 1）包装setTimeout

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
```


### 2）代码

```js
function promisify(original) {
  if (typeof original !== 'function')
    throw new ERR_INVALID_ARG_TYPE('original', 'Function', original);

  if (original[kCustomPromisifiedSymbol]) {
    const fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new ERR_INVALID_ARG_TYPE('util.promisify.custom', 'Function', fn);
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, 
      enumerable: false, 
      writable: false, 
      configurable: true
    });
    return fn;
  }

  const argumentNames = original[kCustomPromisifyArgsSymbol];

  function fn(...args) {
    return new Promise((resolve, reject) => {
      original.call(this, ...args, (err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (argumentNames !== undefined && values.length > 1) {
          const obj = {};
          for (var i = 0; i < argumentNames.length; i++)
            obj[argumentNames[i]] = values[i];
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
    });
  }
  //......
}
```


```js
function callbackify(original) {
  if (typeof original !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('original', 'Function', original);
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified(...args) {
    const maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new ERR_INVALID_ARG_TYPE('last argument', 'Function', maybeCb);
    }
    const cb = (...args) => { Reflect.apply(maybeCb, this, args); };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    Reflect.apply(original, this, args)
      .then((ret) => process.nextTick(cb, null, ret),
            (rej) => process.nextTick(callbackifyOnRejected, rej, cb));
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          Object.getOwnPropertyDescriptors(original));
  return callbackified;
}
```

### 3）几种异步流程

```js

// callback
module.exports = function(cb) {
  fs.readFile('../data/A.txt', function(err, A) {
    if (err) throw err;
    fs.readFile('../data/B.txt', function(err, B) {
      if (err) throw err;
      cb(parseInt(A, 10) + parseInt(B, 10));
    });
  });
};




// promise
// promisify callbackify
const readFile = util.promisify(fs.readFile);
module.exports = async function(cb) {
  let A = await readFile('../data/A.txt');
  let B = await readFile('../data/B.txt');
  cb(parseInt(A, 10) + parseInt(B, 10));
};






// generator
function* files() {
  yield '../data/A.txt';
  yield '../data/B.txt';
}
function iterator(files, results, cb) {
  let file = files.next();
  if (file.done) return cb(results);
  fs.readFile(file.value, function(err, data) {
    results.push(data);
    iterator(files, results, cb);
  });
}
module.exports = function(cb) {
  iterator(files(), [], function (data) {
    let [A, B] = data;
    cb(parseInt(A, 10) + parseInt(B, 10));
  });
};
```





# callbackify
代码中涉及到了process.nextTick

### 1） setTimeout，setImmediate，process.nextTick

- setTimeout

setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证

- setImmediate

setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数，和setTimeout(fn,0)的效果差不多，但是当他们同时在同一个事件循环中时，执行顺序是不定的。

- process.nextTick()

process.nextTick()方法可以在当前"执行栈"的尾部-->下一次Event Loop（主线程读取"任务队列"）之前-->触发process指定的回调函数。也就是说，它指定的任务总是发生在所有异步任务之前，当前主线程的末尾。（nextTick虽然也会异步执行，但是不会给其他io事件执行的任何机会）

### 2） 回调化代码
```js
function callbackify(original) {
  function callbackified(...args) {
    const maybeCb = args.pop();
    const cb = (...args) => { 
      maybeCb.apply(this, args); 
    };
    original.apply(this, args)
      .then((...rov) => {
        cb.apply(null, rov) 
      });
  }
  return callbackified;
}

async function fn() {
  return 'hello world';
};
callbackify(fn)((res) => {
  console.log(res); // hello world
});


async function xxxx(params) {
  return '?????????'
}
xxxx().then(res=>{
  console.log(res) // ?????????
})

```

