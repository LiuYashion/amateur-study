# 函数
函数是一个在特定环境中执行代码的对象

## 1.0 定义函数
创建函数2种方法：
- 函数声明（函数声明提升：请直接理解为，将函数声明的代码移动至顶端，不会被if else限制）

- 函数表达式


## 2.0  递归
程序调用自身的编程技巧称为递归，下面这种不会在外部作用域中创建变量，推荐
```js
var factorial = function f(num){
  console.log(this)
  if(num == 1){
    return 1
  }else{
    return num * f(num - 1)
  }
}
```


调用argument.callee来完成递归，但是会获取到不同的this，会把当前函数作用域的this，当做下一次递归的this使用，所以不推荐
```js
var factorial = function f(num){
  console.log(this)
  if(num == 1){
    return 1
  }else{
    return num * arguments.callee(num -1)
  }
}
```


## 3.0 函数传参
js中函数的参数，基本类型是值传递，对于引用类型是对象的引用。对于setName方法，obj复制的是person对象的索引（一个指针），所以可以通过obj.name访问到该对象的属性。此时对obj操作会影响到person对象。然鹅，对obj的重新赋值（新对象的指针），会导致obj访问到别的对象，此时的操作也就和person无关了

```js
function setName(obj){
  obj.name = 'LiuYashion'
  obj = new Object()
  obj.name = 'newYashion'
}

var person = new Object()
setName(person)
console.log(person.name)  //LiuYashion
```

## 2.3 若干名词定义
- 执行环境
  
  执行环境定义了变量和各种数据，每个执行环境都有与之关联的**变量对象**。每个函数有自己的执行环境和**变量对象**

- 变量对象

  **执行环境**中所有的变量和函数都保存在这个对象中，我们无法访问，但是处理数据的时候会用到它，当一个执行环境中所有的代码都被执行完后，这个**变量对象**会被销毁掉

- 活动对象

  如果**执行环境**是函数，那么将其**活动对象**作为**变量对象**。活动对象最开始只包含一个变量，即arguments(全局环境没有)

- 全局执行环境

  全局执行环境是最外围的执行环境，在浏览器中，全局环境被认为是window对象，因此所有的全局变量和函数都是作为window对象的属性和方法创建的。即定义在变量对象上。



## 3.4 作用域链
代码在环境中执行时，会创建**变量对象**的一个作用域链。作用域链的顶部始终都是全局环境的**变量对象**，作用域链指向它的外部环境的**变量对象**，如此循环下去行程作用域链



### 3.4.1 延长作用域链
延长作用域链，其实就是向作用域链添加**变量对象**。但是代码执行完后，这个**变量对象**被移除，那么如何延长作用域链呢

  - 函数

    声明一个函数，相当于添加arguments对象

  - try-catch的catch

    添加包含报错声明的对象

  - with

    添加指定的对象



### 3.5 var的声明
var声明的变量会被自动添加到最接近的环境，函数声明方式不同，提升的结果也不同。仔细看下面的例子。变量提升，是提升声明，初始化代码不会提升
```js
(function(){
  console.log(arguments)              //  1,2,3,callee..
  console.log(typeof arguments.slice) //  undefined
  console.log(foo())                  //  hi
  console.log(typeof bar)             //  undefined   
  function foo(){
    return 'hello'
  }
  var foo = 'wei';
  var bar = function(){
    return 'hello world'
  }

  function foo(){
    return 'hi'
  }  

  console.log(typeof bar)           //  function
  console.log(typeof foo)           //  string
})(1,2,3)
```