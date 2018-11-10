
## Object
对象是一组数据和功能的集合，Object类型是所有它实例的基础
```js

var obj = {}

obj.constructor   
//  保存创建当前对象的函数：function Object() { [native code] }

obj.hasOwnProperty(propertyName)  
//  判断当前对象是否有属性（不包括原型）

obj.isPrototypeOf(object) 
//  用于检查传入对象是否是另一个对象的原型

obj.propertyIsEnumerable(propertyName)  
//  判断属性能否枚举

obj.toLocaleString()  
//  返回对象的字符串表示，和执行环境有关："[object Object]"

obj.toString()  
//  返回对象的字符串表示："[object Object]"

obj.valueOf() 
//  返回最适合该对象的原始值表示(字符串，数字，布尔值)：{}
```