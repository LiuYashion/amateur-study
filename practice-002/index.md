
# basic

## 1）typeof 判断
适用于检测基本数据类型，但是引用类型只能分别出function

简单数据类型
- [string](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/string.md)
- [number](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/number.md)
- [boolean](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/boolean.md)
- [undefined](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/null&undefined.md)
- [null](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/null&undefined.md)
- symbol

复杂数据类型
- [object](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/object.md) （[function](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/function.md) array...）

```js
typeof 'String'         // string
typeof 1000             // number
typeof false            // boolean
typeof undefined        // undefined
typeof null             // object
typeof Symbol()         // symbol

typeof {}               // object
typeof []               // object
typeof function(){}     // function
typeof new String()     // object
```


## 2）instanceof 判断
用于引用类型判断，原理是判断其构造函数

```js
{} instanceof Object
[] instanceof Array
/\test/ instanceof RegExp
new Date() instanceof Date
new String() instanceof String
new String() instanceof Object
new Function() instanceof Function
```


## 3）闭包
[有权访问另一个函数作用域中变量的函数叫做闭包](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/closure.md)



## 4）创建对象
[每创建一个对象都要手写很多代码，所以需要一种模式帮助我们创建对象](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/new.md)



## 5）原型链
[原型链是对象的属性，用来访问对象的原型](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/proto.md)



## 6）继承
[原型链是实现继承的关键](https://github.com/LiuYashion/amateur-study/blob/master/practice-002/parts/inhert.md)


## 7）apply，call实现bind
```js


```