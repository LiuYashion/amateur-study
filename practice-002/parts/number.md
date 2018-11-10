
## Number
Number数值转换很复杂，而且不合理，不建议使用
```js
Number( "" )        //  0
Number( "0" )       //  0
Number( false )     //  0
Number( null )      //  0
Number( undefined ) //  NaN
Number( "444xx" )   //  NaN

parseInt( "0" )       //  0
parseInt( "" )        //  NaN
parseInt( "123abc" )  //  123

parseFloat( "0" )           //  0
parseFloat( "" )            //  NaN
parseFloat( "123abc" )      //  123
parseFloat( "12.12.12abc" ) //  12.12
```