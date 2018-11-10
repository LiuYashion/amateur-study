
# 1.闭包
有权访问另一个函数作用域中变量的函数叫做闭包


## 1.0 相关概念
一些和闭包有关的概念
- 作用域：变量能够引用，函数能够生效的区域

- 闭包：有权访问另一个函数作用域中变量的函数叫做闭包

- 变量对象：包含了执行环境中所有变量和函数的对象叫变量对象

- 活动对象：正在被执行和引用的变量对象叫活动对象

- 作用域链：指向外层作用域的变量对象


Scope就是作用域，[[Scope]]作用域链



## 1.1 普通函数
普通函数的创建调用过程

```js
function compare(value1, value2){
  return value1 - value2
}
var result = compare(6, 10)
```

创建compare()的时候：
- 创建指向全局变量对象（外层变量对象）的作用域链，保存在compare的[[Scope]]中（保存作用域链）

调用compare()的时候：
- 生成compare的执行环境，然后复制它的[[Scope]]属性，链接起执行环境的作用域链（链接作用域链）

- compare的活动对象被创建，放到执行环境作用域链（放入活动对象）

一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中仅仅保留全局作用域，


## 1.2 有闭包的函数
然而，闭包会有所不同。

在另一个函数A内部定义的函数B，将会把A的活动对象添加到它的[[Scope]]链中。
所以B的作用域链中，会包含A的活动对象。这样就造成，在A执行完毕后，A的作用域链会销毁，但A的活动对象不会销毁，因为B仍然在引用这个活动对象
```js
function A(value1, value2){

  return function B(){
    console.log(value1, value2)
  }

}
var result = A(6, 10)
```






## 1.3 闭包

有权访问另一个函数作用域中变量的函数叫做闭包。闭包保存的是整个对象变量，所以下面的例子中，数组内每个函数返回的都是10，因为他们引用的都是i。
```js
function counter(){
  var result = new Array()
  for(var i = 0; i < 10; i++){
    result[i] = function(){
      return i
    }
  }
  return result
}

counter()[5]() // 10
```

如果我们向按照1，2，3..这种的输出，那么我们就在循环的过程中就要赋值
```js
function counter(){
  var result = new Array()
  for(var i = 0; i < 10; i++){
    result[i] = function(index){
      return function(){
        return index
      }
    }(i)
  }
  return result
}

counter()[5]() // 10
```




## 1.4 闭包中的this
this是运行时基于函数的执行环境绑定的，在全局函数中，this等于window。
当函数被作为某个对象方法调用时，this等于那个对象。
但是对象的方法在赋值后，再执行，this就不再指向对象，而是当前的执行环境了
```javascript
var name = 'the window'
var object = {
  name: 'my object',
  getName: function(){
    return function(){
      return this.name
    }
  }
}

object.getName()() // 'the window'

```
在函数被调用的时候，活动对象会自动取得2个变量：this，arguments。这两个变量只会在当前活动对象搜索，


## 1.5 模仿块级作用域
> let，cosnt已经有块级作用域概念了

js中没有块级作用域的概念，所以在块语句中定义的变量，实际上是包含在函数中。当函数销毁了，块语句中的变量也就销毁了，
```javascript
(function(){

})()
```
我们应该尽量少向全局作用域添加变量和函数，防止污染全局作用域





## 1.6 私有变量
在函数内定义的变量，函数外不能访问，可以认为其是私有变量。

我们把有特权访问私有变量和私有函数的共有方法，成为特权方法，有2种在对象上创建特权的方法：

- 在构造函数中定义特权方法
```js
function Myobject(){

  var priva = 10;
  function privateFun(){
    return priva;
  }

  this.publicFun = function(){
    private++;
    return privateFun()
  }
}
```

