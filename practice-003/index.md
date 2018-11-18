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

是的发送到阿斯蒂芬奥术大师多

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