## String
用于表示字符串类型,如果想把某个值变成字符，可以使用 + ""操作

```js
//  toString除了null和undefined，其他都是一样
var exp1 = 100
var exp2 = false
var exp3 = null || undefined   

var exp4 = []
var exp5 = ['a','b']
var exp6 = {}
var exp7 = {name: 'a'}
var exp8 = function(){}


exp1.toString()        // "100"
exp2.toString()        // "false"
exp3.toString()        // 报错

exp4.toString()        // ""
exp5.toString()        // "a,b"
exp6.toString()        // "[object Object]"
exp7.toString()        // "[object Object]"
exp8.toString()        // "function (){}"

String( null )          //  "null"
String( undefined )     //  "undefined"
String( 100 )           //  "100"
String( false )         //  "false"
String( {} )            //  "[object Object]"
String( function(){} )  //  "function (){}"
String( [] )            //  ""
String( ['a','b'] )     //  "a,b"
```