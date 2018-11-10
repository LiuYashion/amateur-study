## Undefined / Null
undefined表明变量申明了但是没有初始化，下面==相等的原因，只是类型转换的结果
```js
null == undefined //true
```

# 2.布尔操作符


## 2.1 !
同Boolean()一样
```js
!""         //  true
!0          //  true
!null       //  true
!NaN        //  true
!undefined  //  true
```


## 2.2 &&
就远原则，第一个为false，NaN，undefined，null那么就返回对应的
```js
false && true       //  false
NaN   && true       //  NaN
null  && true       //  null
undefined  && true  //  undefined
```


## 2.3 ||
就近原则，第一个为true就返回对应的，反之返回第二个
```js
true  || false      //  true
true  || NaN        //  true
true  || null       //  true
false || undefined  //  undefined
```

## 2.4 加减操作符/乘法运算符/除法操作符/相等比较符
计算包含NaN结果就为NaN(加减乘除都是),比较只要包含NaN比较就为false
```js
Infinity - Infinity //  NaN
Infinity * 0;       //  NaN
0/0;                //  NaN
x/0;                //  Infinity
null == undefined   //  true
```

## 2.5 全等比较符 ===
更加严格，不会转换类型比较