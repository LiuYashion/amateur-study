## 声明提升

- 函数的声明会被提升到它当前作用域之前
  
  ```js
  var a = 1;

  function b() {
    a = 10;
    return;
    function a() {}
  }
  b();
  alert(a); // 1

  // 这里把b改写一下
  function b() {
    var a = function(){}
    a = 10;
    return;
  }
  ```


- JavaScript 仅提升声明，而不提升初始化

  ```js
  var x = 1;                 // 声明 + 初始化 x
  console.log(x + " " + y);  // '1 undefined'
  var y = 2;                 // 声明 + 初始化 y

  //上面的代码和下面的代码是一样的 
  var x = 1;                 // 声明 + 初始化 x
  var y;                     //声明 y
  console.log(x + " " + y);  //y 是未定义的
  y = 2;                     // 初始化  y 
  ```