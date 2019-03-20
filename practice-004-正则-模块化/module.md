## 模块化
因为web应用越来越复杂，所以需要模块化开发，管理。


## (1 module
```js
function foo(){
    //...
}
function bar(){
    //...
}
```
上面这样容易污染全局变量，命名冲突，那么简单封装一下

```js
var myApp = {
  foo: () => {},
  bar: () => {}
}
myApp.foo()
```
然鹅，只是减少了全局变量个数，本质是对象，并不安全，可以被篡改啊

```js
var Module = (function(￥){
    var _private = "safe now";
    var foo = function(){
        console.log(_private)
    }

    return {
        foo: foo
    }
})(jQuery)

Module.foo();
Module._private; // undefined
```
用个闭包（毕竟函数是js唯一的局部作用域），然后传入依赖。这就是现在模块的基石

http://huangxuan.me/js-module-7day/#/8
