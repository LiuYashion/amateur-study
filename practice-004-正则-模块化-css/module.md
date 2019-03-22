## 模块化
因为web应用越来越复杂，所以需要模块化开发，管理。


# (1 module
我们来模块化

```js
function foo(){
    //...
}
function bar(){
    //...
}
```
↑ 上面这样容易污染全局变量，命名冲突，那么简单封装一下


```js
var myApp = {
  foo: () => {},
  bar: () => {}
}
myApp.foo()
```
↑ 然鹅，只是减少了全局变量个数，本质是对象，并不安全，可以被篡改啊


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
↑ 用个闭包（毕竟函数是js唯一的局部作用域），然后传入依赖。这就是现在模块的基石


# (2 script loader
封装好了，加载呢？
```html
<html>
  <head>
    <meta charset="utf-8">
    <script src="../js/jquery.js"></script>
    <script src="../js/app.js"></script>
  </head>
</html>
```

↑ 我们发现：
- 顺序很重要，被引用的必须放在前面
- 都是平行加载的
- 从上而下的执行顺序

所以...

```html
<html>
  <head>
    <meta charset="utf-8">
    <script src="../js/zepto.js"></script>
    <script src="../js/fastclick.js"></script>
    <script src="../js/iScroll.js"></script>
    <script src="../js/jquery.js"></script>
    <script src="../util/wxbridge.js"></script>
    <script src="../util/login.js"></script>
    <script src="../util/base.js"></script>
    <script src="../util/cookie.js"></script>
    <script src="../js/app.js"></script>
    ...
    ...
    ...
  </head>
</html>
```

**难以维护，依赖模糊，请求过多**，所以...


### (2.1 LABjs - 2009
看看它如何管理
```html
<script src="LAB.js"></script>
<script>
  $LAB
  .script("http://remote.tld/jquery.js").wait()
  .script("/local/plugin1.jquery.js")
  .script("/local/plugin2.jquery.js").wait()
  .script("/local/init.js").wait(function(){
      initMyPage();
  });
</script>
```
先进来，先执行。这就是基于文件之间依赖的管理


# (3 module loader

### (3.1 YUI3 - 2009

```js
// 编写模块，DOM向Y添加方法
YUI.add('dom', function(Y){
  Y.DOM = {
    doSomeThing: function(){...}
  }
})

YUI.add('hello', function(Y){
  Y.sayHello = function(msg) {
    Y.DOM.doSomeThing()
  }
}, '3.0.0', {
  requires: ['dom']
})

// 使用模块，被添加的方法
YUI.use('dom', function(Y){
  Y.DOM.doSomeThing()
})
YUI().use('hello', function(Y){
  Y.sayHello("hey yui loader");
})
```

在当前YUI的实例上执行模块的初始化代码，使得模块在实例上可用。这就是基于模块的依赖管理，y就像一个沙箱（提供了运行的环境，并且不会对其他模块和沙箱造成影响）

上面的做法，使得我们不需要按顺序排列script标签了，因为我们会统一使用use将需要的文件组合起来，即：加载与执行分离

**然而.. 对于script，我们还是没有好的解决方法...，还有太多http请求**

YUI()有组合script文件的功能，当然，这肯定需要服务端的支持了


# (4 commonJS
不再只是浏览器环境了

```js
// 定义模块
exports.add = function(a, b){
  return a + b;
}

// 引用模块
var math = require('math')
math.add(1, 3)
```

require传一个string时是同步加载，传数组的时候是异步加载。对于服务端，同步加载并不是问题，浏览器环境才是问题


# (5 AMD / CMD

那我们针对浏览器环境，再来看看。这里有两个规范

- AMD：RequireJS 针对浏览器模块化的规范输出
- CMD：SeaJS 针对浏览器模块化的规范输出

然而都会在外面包裹一层define()，所以...


# (6 browserify / webpack
我们现在就是想去掉这层包裹

## browserify
  浏览器环境里的commonJS，编写之后，自动watch compile，也是通过AST抽象语法树来分析依赖关系，debug则通过source map，

## webpack
  转换，绑定，打包里的所有文件。webapck更大更全，兼容性，代码分割，加载器，插件，开发工具，工作流。



# (7 es6 module
在es6之前，js没有模块可言。

## babel
现在就开始使用下一代的js特性，import引入，export导出

```js
// math.js
export default math = {
    PI: 3.14,
    foo: function(){}
}

// app.js
import math from "./math";
math.PI
```

## 来看看几个说烂了的

require是node和es6都支持的

### 1）module.exports | exports
这是node环境的模块规范，

### 2）import | export | export default
export default 相当于自动帮你包裹了导出，export 导出的，在引入的时候需要加上{}
```js
// export
export const a = '100';
export const dogSay = function(){
  console.log('wang wang');
}
function catSay(){
  console.log('miao miao');
}
export { catSay }

// import
import { dogSay, catSay } from './testEs6Export';


// export default
const m = 100;
export default m;

// import
import m from './testEs6Export';

//  as 集合成对象导出
import * as testModule from './testEs6Export';
```
