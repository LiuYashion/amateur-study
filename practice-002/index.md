
### 1.0
  this代表上下文对象

  - this
  ```js
  function foo(num) {
    console.log( "foo: " + num );
    // keep track of how many times `foo` is called
    this.count++;
  }

  foo.count = 0;
  for (var i=0; i<10; i++) {
    if (i > 5) {
      foo(i);
    }
  }
  // foo: 6
  // foo: 7
  // foo: 8
  // foo: 9
  console.log( foo.count ); // 0 ？？？

  ```

  - this.scoped

  ```js
  function foo() {
    var a = 2;
    this.bar();
  }

  function bar() {
    console.log( this.a );
  }

  foo(); //undefined
  ```
    
    this是运行时绑定的，上下文是基于方法调用时的情况。this的绑定跟函数在哪里声明的没有关系，只跟函数调用方式有关。

    当一个函数被调用时，一个execution context被记录下来，这个上下文包含了如下信息：函数在哪被调用，函数如何被调用，传了什么参数，等等。其中一个参数就是this：引用了函数执行期间将被使用