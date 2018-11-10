
# 1.原型和原型链

## 1.0 相关概念
三者关系如下
- \_\_proto\_\_ 原型链

- prototype 原型

- constructor 构造函数

person --(\_\_proto\_\_)--> Person.prototype  --(constructor)--> Person


### 1.0.1 \_\_proto\_\_
__proto__是对象的属性，用来访问对象的原型

```js
function Person(){}
var person = new Person()
person.__proto__ === Person.prototype // true
```

### 1.0.2 prototype
prototype是函数的属性，用来访问函数对象原型。由es自动添加。
```js
{
  constructor: Person,
  __proto__:Object
}
Object.getPrototypeOf(person) === Person.prototype // 获取原型
```

### 1.0.3 constructor
constructor是原型的属性，用来访问原型所属的函数。
```js
Person.prototype.constructor === Person // true
```





# 2.简单分类
根据上面介绍的，可以将对象进行分类

- 简单对象：只有__proto__属性。（new Object()，new Person()，{}）

- 原型对象：有__proto__，constructor属性。（Person.prototype）

- 函数对象：有__proto__，prototype属性。（Person()，Function，Object，Array...）


## 2.0 Function.prototype
Function.prototype是个例外：它是原型对象，却又是函数对象；作为函数对象，它又没有prototype属性。

```js
typeof Object.prototype   === 'object'    // true
typeof Person.prototype   === 'object'    // true
typeof Function.prototype === 'function'  // true
typeof Function.prototype.prototype       // undefined
```




# 3.介绍
图示很简单，把原型，构造函数，实例作为一组看。很快就能记住
- 红色指向构造函数的原型对象

- 黄色指向原型对象的原型对象


我们发现：

所有构造函数的原型都是Function.prototype

所有原型的原型都是Object.prototype

![default](https://user-images.githubusercontent.com/13444818/35474510-19b211e8-03ca-11e8-905b-854ac12ef6e7.png)





# 4.原型链
构造函数的原型，串联起来的链表，叫做原型链。

原型对象有constructor指向构造函数，实例对象有__proto__指向原型对象


```js
function Super(){}
Super.prototype.getName = function(){
  return this.name
}

function Sub(){}
Sub.prototype = new Super()

var subInstance = new Sub()
```

![1](https://user-images.githubusercontent.com/13444818/35479987-3fb15f6e-043f-11e8-9ec1-8bf466d1b172.png)

如果让原型对象等于另一个类的实例对象，此时的原型对象A将包含__proto__指向另一个原型对象B，原型对象B有constructor指向构造函数。如果B的原型对象是构造函数C的实例呢，如此下来就构成了原型链。即prototype链接起来的一个链表。

就像上图中的红色连线，通过子类的实例，访问父类原型的链表，叫原型链





# 5.new的过程
解释一下new一个对象的过程，结合上面的图就很好理解了
```js
var person1 = new Person('Clay', 18)

/** 等同于下面代码 */
var person1 = new Object()
person.__proto__ = Person.prototype
Person.call(person, 'Clay', 18)
```