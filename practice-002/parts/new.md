


# 2.定义对象
从上面可以看出，每创建一个对象都要手写很多代码，所以需要一种模式帮助我们创建对象




## 2.1 工厂模式
可以看出，工厂模式就是一个包装，尽管解决了创建问题。但是没解决对象的识别问题，我们不知道对象的类型（creatPerson）
```js
function creatPerson(name, age, job){
  var _p  = new Object();
  _p.name = name;
  _p.age  = age;
  _p.sayName = function(){
    alert(this.name, this.age)
  }
  return _p
}
var person1 = new creatPerson('lyx', 18, 'code')

person1 instanceof creatPerson  // false
```





## 2.2 构造函数模式
类似于Object，Array这种由运行环境提供的原生构造函数，我们也可以自己写自定义构造函数
```js
function Person(name, age){
  this.name = name;
  this.age  = age;
  this.sayName = function(){
    alert(this.name)
  }
}
var person1 = new Person('Clay', 18)

/** 想想new的本质 */
var person1 = new Object()
person1.__proto__ = Person.prototype
Person.call(person1, 18, 'code')

console.log( person1 instanceof Person )  // true  
console.log( person1 instanceof Object )  // true  
```




### 2.2.1 关于构造函数
构造函数使用起来，和普通函数没有什么区别。同时构造函数还有一些问题：其生成的每个对象，sayName对应的function是2个不同的实例。下面的方法可行，但是sayName又被放在全局作用域下，没有封装性可言：
```js
function Person(name, age){
  this.name = name;
  this.age  = age;
  this.sayName = sayName
}
function sayName(){
  alert(this.name)
}
var person1 = new Person('Clay', 18)
```




### 2.2.2 那么有没有好一些的方法呢？
prototype是函数的属性，在一个函数声明的时候，es就会为其添加一个prototype属性，里面有constructor指向（构造）函数，当然，属性的值是一个对象，__proto__也就不用说了，指向了Object.prototype。
每个函数都有prototype属性，创建函数的时候，js会自动为其添加prototype属性，值是一个空对象。

那么我们把方法定义在这个prototype上面如何？






## 2.3 原型模式
原型模式很好的解决了function共享，代码存放于全局的问题
```js
function Person(){}
Person.prototype.name = 'Clay'
Person.prototype.age  = 18
Person.prototype.sayName = function(){
  console.log(this.name)
}
var person1 = new Person()

person1.__proto__ === Person.prototype    // true
person1.__proto__.constructor === Person  // true
Person.prototype.isPrototypeOf(person1)   // true
```
原型链涉及到继承，属性访问当前对象没有，就会顺着原型链访问






### 2.3.1 原型属性和实例属性
当我们设置实例上的属性name，即使我们设置为null，也无法再访问到原型链中的同名属性，设置的同时就已经屏蔽了原型上的属性，除非delete实例上的这个属性。
```js
var person1  = new Person()
person1.name = 'Lara'
{
  name: 'Lara',
  __proto__:{
    name: 'Clay',
    age: 18
  }
}
```




### 2.3.2 属性检测和对象遍历
检测对象是否有某属性，不会顺着原型链访问。for-in，能遍历可枚举的实例属性和原型属性，所有开发人员定义的属性都是可枚举的。
```js
person1.hasOwnProperty('name')  
// 自己的属性为true，来自原型的为false

'name' in person1               
// 只要属性能够访问，就为true
```




### 2.3.3 属性获取
```js
function Person(){}
Person.prototype.name = 'Clay'
Person.prototype.age  = 18
Person.prototype.sayName = function(){
  console.log(this.name)
}

var person1 = new Person()
person1.constructor === Person // person1.__proto__.constructor 会顺着原型链访问 true

person1.name = 'Lyx'

//  获取可枚举属性
Object.keys(person1)          // ["name"]
Object.keys(Person.prototype) // ["name", "age", "sayName"]
Object.keys(Person)           // []

//  获取不可枚举属性
Object.getOwnPropertyNames(person1)           // ["name", "age", "sayName"]
Object.getOwnPropertyNames(Person.prototype)  // ["constructor", "name", "age", "sayName"]
Object.getOwnPropertyNames(Person)            // ["length", "name", "arguments", "caller", "prototype"]
```





## 2.4 更简单的原型模式
每添加一个属性或者方法就要写，Person.prototype...，这样很繁杂，那就重写prototype吧。

但是这里，我们相当于对Person.prototype进行了重写，这种字面量创建的方式最终结果相同，
然而漏了每个原型对象都有的constructor属性，Person.prototype的constructor要指向构造函数Person

```js
function Person(){
 
}
Person.prototype = {
  name: 'Clay',
  age: 19,
  sayName: function(){
    console.log(this.name)
  }
}
var person1 = new Person()
person1.constructor === Object // true

// 自己定义
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person
})
```




## 2.5 动态性问题
因为根据动态原型链访问，所以对于原型链的修改能够在实例上体现，但是如果我们整体重写了prototype，可能就会出现问题了

这里sayHi可以继续访问，sayName不行
这样想：Person.prototype.sayHi使得我们向原型链中添加了sayHi方法
但是prototype的复写，并不会让复写对象被添加进去，仅仅只是指针指向的内存变了而已，除非这时再new Person()才会生效
```js
function Person(){

}
var friendA = new Person()

Person.prototype.sayHi = function(){
  console.log('hi')
}
Person.prototype = {
  name: 'Clay',
  age: 19,
  sayName: function(){
    console.log(this.name)
  }
}
friendA.sayHi()   // hi
friendA.sayName() // error
```




## 2.6 原生对象的原型
Object，Array，String等，都是在其构造函数的原型上定义了方法
如Array.prototype的sort()，引用类型的修改（function的重写，array的push）就会影响到所有实例了




## 2.7 组合使用构造函数模式和原型模式吧
构造函数（代码不能复用，函数不能共享），原型模式（引用类型共享），那就各取所长吧。
```js
function Person(name, age){
  this.name = name
  this.age  = age
  this.friends = ['Allen', 'Cindy']
}

Person.prototype = {
  constructot: Person,
  sayName: function(){
    console.log(this.name)
  }
}

var personA = new Person('lyx', 20)

```

这样我们保证了：

- 方法是共享的，对于数组类型的修改，都是基于自身私有的，即：age，name，friend都是在实例上，而不是原型上

- sayName是在原型链上，实现了方法共享



