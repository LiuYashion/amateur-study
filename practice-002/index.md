
# JS基础

## 1）typeof 判断
适用于检测基本数据类型，但是引用类型只能分别出function

简单数据类型
- String 
- Number 
- Boolean 
- Undefined 
- Null 
- Symbol

复杂数据类型
- Object

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


## 3）函数
函数是一个在特定环境中执行代码的对象