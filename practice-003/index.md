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
11111111




# 事件代理和委托
22222222