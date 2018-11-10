

# 继承
原型链是实现继承的关键

## 1.1 原型链继承
新建对象的时候，我们知道，当前对象没找到属性时，会顺着原型链去访问。那既然这样
让超类的一个实例new SuperType()去做子类的原型SubType.prototype
这样基于该原型生成的子类实例，都能顺着原型链往超类访问了，也就实现了继承。



### 1.1.1 超类
```js
function SuperType(){
  this.property = true
}
SuperType.prototype.getSuperValue = function(){
  return this.property
}
var superA = new SuperType()

/**
{
  property:true,
  __proto__:{
    getSuperValue: f(),
    constructor: SuperType
    __proto__: Object
  }
}
**/
```


### 1.1.2 子类
```js
function SubType(){
  this.subproperty = false
}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function(){
  return this.subproperty
}
var instance = new SubType()

/**{
  subproperty:false,
  __proto__:{
    getSubValue: f(),
    property: true
    __proto__: {
      getSuperValue: f(),
      constructor: SuperType
    }
  }
}*/
```

这里我们不难看出，SubType的原型，是SuperType的实例。在new的时候，会把构造函数的原型和实例通过__proto__链接起来，所以SubType的实例，访问能通过原型链访问到SuperType的实例，从而实现继承

当instanceof检测原型的时候，先访问SubType.prototype.constructor，如果依然没访问到就会顺着原型链继续访问，又会访问到new SuperType()，也就是SuperType的实例，这个实例可以通过supertype.__proto__访问到SuperType.prototype，也就能够访问到原型方法了




## 1.2 实例判断和原型检测

instanceof 实例判断，检测构造函数
```js
console.log( instance instanceof Object    ) true
console.log( instance instanceof SuperType ) true
console.log( instance instanceof SubType   ) true
```

isPrototypeOf() 原型检测
```js
console.log( Object.prototype.isPrototypeOf(instance)    ) true
console.log( SuperType.prototype.isPrototypeOf(instance) ) true
console.log( SubType.prototype.isPrototypeOf(instance)   ) true
```
  



## 1.3 原型链的问题
所有实例会共享其原型的引用类型属性，下面的colors就被共享了，因为他们共享的new SuperType()这个原型

```js
function SuperType(){
  this.colors = ['red', 'blue', 'green', 'brown']
}
function SubType(){

}

SubType.prototype = new SuperType()
var instanceA = new SubType()

instanceA.colors.push('black')

console.log(instanceA.colors)
// ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType()
console.log(instanceB.colors)

// ["red", "blue", "green", "brown", "black"]
```




## 1.4 借用构造函数
> 函数只是一个在特定环境中执行代码的对象

这里就相当于借用了SuperType的构造函数，即：在SubTypez中借用了SuperType中的代码。而且我们还可以在借用构造函数中，向超类的构造函数传递参数
```js
function SuperType(name){
  this.name   = name
  this.colors = ['red', 'blue', 'green', 'brown'];
}

function SubType(){
  SuperType.call(this, 'pygz')
}

var instanceA = new SubType()
instanceA.colors.push('black')
//  colors: ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType()
//  colors: ["red", "blue", "green", "brown"]
```




### 1.4.1 借用构造函数的问题
然后构造函数也是有问题的，如下：
- 方法都写在构造函数中，所以函数虽一样但是都是不同实例（方法不共享）
- 因为借用了构造函数，所以SubType和SuperType没有联系，在超类型原型中定义的方法，子类型也就不可见了（无法访问超类的方法）

```js
function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green', 'brown'];
  this.sayHi = function(){
    console.log('hi')
  }
}
SuperType.prototype.sayName = function(){
  console.log('hello~')
}

function SubType(){
  SuperType.call(this)
}

var instanceA = new SubType()
instanceA.sayName() // 报错
```





## 2.1 组合继承
组合继承避免了原型链（array共享，传递参数）和借用构造函数（代码冗余，超类子类无联系）的缺点
- 原型链：共享属性和方法
- 构造函数：独享属性和方法

```js
function SuperType(name){
  this.name   = name
  this.colors = ['red', 'blue', 'green', 'brown'];
}
SuperType.prototype.sayName = function(){
  console.log(this.name)
}

function SubType(name, age){
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.sayAge = function(){
  console.log(this.age)
}

var instanceA = new SubType('LYX', 18)
instanceA.colors.push('black')
//  age:    18
//  name:   'LYX'
//  colors: ["red", "blue", "green", "brown", "black"]

var instanceB = new SubType('PYGZ', 22)
//  age:    22
//  name:   'PYGZ'
//  colors: ["red", "blue", "green", "brown"]
```
**鉴于组合式继承的优点，它成为了javascript中最常用的继承模式**







### 2.1.1 组合继承的问题
然而组合继承还是有一点自己的不足，就是在指定原型的时候，会执行一次超类的构造函数。
就是这一次执行，会造成一些损耗。示例中间就会有两个重复的colors数组

```js
function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green', 'brown'];
}
SuperType.prototype.sayName = function(){
  console.log(this.name)
}

function SubType(name, age){
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.sayAge = function(){
  console.log(this.age)
}

var instance = new SubType('LYX', 18)

// 组合继承生成的SubType实例结构：
{ 
  age: 18,
  colors: ["red", "blue", "green", "brown"],
  name: 'LYX',
  __proto__:{ 

    /** 这两行其实是不需要的 */
    colors: ["red", "blue", "green", "brown"],  
    name: undefined,
    /** 这两行其实是不需要的 */
    
    sayAge: function(){}
    __proto__:{ 
      sayName: function(){},
      constructor: SuperType(name){}
      __proto__: Object
    }
  }
}
```






## 3.1 原型式继承
new F()的时候，相当生成了一个新对象，由F构造，对象原型链指向F.prototype，也就是obj，我们传入的对象

然而缺点显而易见，这个obj被当做原型共享，所以object里面的array数据也是共享的，一个实例push了，所有实例都会被影响

```js
function object(obj){
  function F(){}
  F.prototype = obj
  return new F()
}

// 这句代码和上面的效果一样
// 会使用指定的原型对象及其属性去创建一个新的对象

var foo = {name: 1234}
var res = Object.create(foo) // { __proro__:{ name:1234 } }

foo.name = 'Liu'
console.log(res.name) // Liu
```





## 4.1 寄生式继承
寄生模式主要考虑到通过对象继承，任何能够返回新对象的函数，都适用于这种模式
然而寄生式继承也是有不足的，它不能做到函数复用，这点和构造函数模式相似
```javascript
function createAnother(origin){
  var clone = Object.create(origin)
  clone.sayHi = function(){
    console.log('hi')
  }
  return clone
}

var foo = {name:1234}
var res = createAnother(foo)

foo.name = 'Liu'
console.log( res.name ) // Liu
```



## 5.1 寄生组合式继承
我们为了指定子类原型，而调用超类构造函数其实是没有必要的
我们不需要colors和name，我们使用超类原型的副本就行了。

```js

function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype
}

function SuperType(name){
  this.name = name
  this.colors = ['red', 'blue', 'green', 'brown'];
}
SuperType.prototype.sayName = function(){
  console.log(this.name)
}

function SubType(name, age){
  SuperType.call(this, name)
  this.age = age
}
inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function(){
  console.log(this.age)
}

var instanceA = new SubType('LYX', 18)


//寄生组合式继承的SubType实例结构：
{ //SubType
    age: 18,
    colors: ["red", "blue", "green", "brown"],
    name: 'LYX',
    _proto_:{ //SuperType
        constructor: SuperType(name){}
        sayAge: function(){}
        _proto_:{ //Object
            sayName: function(){},
            _proto_: Object
        }
    }
}

```

本来我们也只需要继承原型，实例虽然有原型，但是实例的属性我们是不需要的

这样我们只用调用一次superType构造函数，就是在实例化对象的时候



## 4.1 ES6继承方式
比较简单直观，从例子可以看出，能够覆盖父类方法，并且能够访问到父类方法

这是语法糖，本子的还是要理解的
```javascript

  class Parents{
    constructor(name){
      this.name = name
    }
    parent(){
      console.log('parents: ', this.name)
    }
    sayName(){
      console.log('parents: ', this.name)
    }
  }

  class Child extends Parents{
    constructor(name, parentName){
      super(parentName) // 表示调用父类的constructor
      this.name = name
    }
    sayName(){
      console.log('child：', this.name)
    }
  }

  const child = new Child('son', 'father')
  child.sayName() //  child： son
  child.parent()  //  parents:  son

  const parent = new Parents('father')
  parent.sayName() // parents:  father
```


## 4.1.1 bable对ES6的转义
看看bable的转义结果，对于一些高阶API还是要精通的
```js
var _createClass = function () { 
  function defineProperties(target, props) { 
    for (var i = 0; i < props.length; i++) { 
      var descriptor = props[i]; 
      descriptor.enumerable = descriptor.enumerable || false; 
      descriptor.configurable = true; 
      if ("value" in descriptor) 
        descriptor.writable = true; 
      Object.defineProperty(target, descriptor.key, descriptor);
    } 
  } 
  return function (Constructor, protoProps, staticProps) { 
    if (protoProps) 
      defineProperties(Constructor.prototype, protoProps); 
    if (staticProps) 
      defineProperties(Constructor, staticProps); 
    return Constructor; 
  }; 
}();

function _possibleConstructorReturn(self, call) { 
  if (!self) { 
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); 
  } 
  return call && (typeof call === "object" || typeof call === "function") ? call : self; 
}

function _inherits(subClass, superClass) { 
  if (typeof superClass !== "function" && superClass !== null) { 
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
  } 
  subClass.prototype = Object.create(superClass && superClass.prototype, { 
    constructor: {
       value: subClass, 
       enumerable: false, 
       writable: true, 
       configurable: true 
    } 
  }); 
  if (superClass) 
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
}

function _classCallCheck(instance, Constructor) { 
  if (!(instance instanceof Constructor)) { 
    throw new TypeError("Cannot call a class as a function"); 
  } 
}

var Parents = function () {
  function Parents(name) {
    _classCallCheck(this, Parents);

    this.name = name;
  }

  _createClass(Parents, [{
    key: 'parent',
    value: function parent() {
      window.console.log('parents: ', this.name);
    }
  }, {
    key: 'sayName',
    value: function sayName() {
      window.console.log('parents: ', this.name);
    }
  }]);

  return Parents;
}();

var Child = function (_Parents) {
  _inherits(Child, _Parents);

  function Child(name, parentName) {
    _classCallCheck(this, Child);

    // 表示调用父类的constructor
    var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, parentName));

    _this.name = name;
    return _this;
  }

  _createClass(Child, [{
    key: 'sayName',
    value: function sayName() {
      window.console.log('child：', this.name);
    }
  }]);

  return Child;
}(Parents);


var child = new Child('son', 'father');
child.sayName(); //  child： son
child.parent(); //  parents:  son

var parent = new Parents('father');
parent.sayName(); // parents:  father
```