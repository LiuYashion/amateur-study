
## This 2

在This 1中，我们讨论了this的错误用法，并且知晓this是一个为每个函数调用创建的绑定，它是基于函数是如何被调用的。

---
### 调用句柄
要了解this的绑定，我们需要了解函数调用句柄：函数被调用时在代码中的位置，即this引用的是什么？总的来说就是定位函数在哪被调用的，但是特定的代码方式能掩盖真正的调用句柄。

我们需要思考的是调用堆栈，我们所关心的调用句柄，是在当前执行函数之前的调用中。

这里展示一下 调用堆栈call-stack 、调用句柄call-site
```js
function aaa() {
  // 调用堆栈是： `aaa`
  // 所以，我们的句柄在 the global scope
  console.log( "aaa" );
  bbb(); // <-- 句柄 `bbb`
}

function bbb() {
  // 调用堆栈是： `aaa` -> `bbb`
  // 所以，我们的句柄在 `aaa`
  console.log( "bbb" );
  ccc(); // <-- 句柄 `ccc`
}

function ccc() {
  // 调用堆栈是： `aaa` -> `bbb` -> `ccc`
  // 所以，我们的句柄在 `bbb`
  console.log( "ccc" );
}

aaa(); // <-- 句柄 `aaa`
```
注意，我们只关心找到真正的调用句柄，因为跟this绑定有关的只有这一个。

你可以通过上面代码段里面的调用堆栈方法，来捋清调用的顺序，但是这样很累而且易出错。另一个方法查看调用堆栈的方法就是使用debug工具。

我们把注意力放在句柄是如何在函数执行的时候，决定this指向的。

你需要注意的有4点：

- 缺省绑定

    最常见的情况———独立函数调用。当没有其他规则适用的时候，把这种方法当做默认的。
    ```js
    function foo() {
      console.log( this.a );
    }

    var a = 2;

    foo(); // 2
    ```
    ↑ 这里有一点，在全局作用域范围声明的变量，等同于全局对象的同名属性。他们不是彼此的副本，而是等同的。而且我们发现，当foo()被调用的时候，this.a指向了全局变量a，为什么？因为这种情况下，这种调用的缺省绑定，适用于函数调用。

    有一个重要的细节：即使所有的this绑定是基于句柄，但全局对象是唯一有资格做缺省绑定的（排除严格模式），

- 隐式绑定

    另一种就是思考：句柄是否有上下文对象
    ```js
    function foo() {
      console.log( this.a );
    }

    var obj = {
      a: 2,
      foo: foo
    };

    obj.foo(); // 2
    ```
    ↑ 可以发现，foo首先被定义，然后作为引用属性被添加到obj上。先不管foo是如何在obj上面声明的或者是被引用。但是句柄用过了通过了obj的上下文访问了方法，所以你可以说是在函数调用的时候，obj拥有了函数的引用。不论哪种，foo都是obj被调用的。当函数有一个上下文对象的引用，隐式绑定规则，前面的这个对象会被用于this的绑定。

    只有最后一个对象，会影响句柄this的绑定。

    ```js
    function foo() {
      console.log( this.a );
    }
    var obj = {
      a: 2,
      foo: foo
    };
    var bar = obj.foo; // function reference/alias!
    var a = "oops, global"; // `a` also property on global object
    bar(); // "oops, global"
    ```

    - 隐式丢失

      当隐式绑定方法失去它的能力时，这种绑定就会变成缺省绑定。
      ```js
      function foo() {
        console.log( this.a );
      }
      var obj = {
        a: 2,
        foo: foo
      };
      var bar = obj.foo; // 函数引用后，起别名
      var a = "oops, global"; // `a` also property on global object
      bar(); // "oops, global"
      ```

      ↑ 即时bar看上去很像obj.foo的引用，实际上，这只是对foo的另一个引用。句柄是bar()，就是普通的调用，因此是缺省绑定。

      ```js
      function foo() {
        console.log( this.a );
      }

      function doFoo(fn) {
        // `fn` is just another reference to `foo`
        fn(); // <-- call-site!
      }

      var obj = {
        a: 2,
        foo: foo
      };

      var a = "oops, global"; // `a` also property on global object
      doFoo( obj.foo ); // "oops, global"
      ```

      ↑ 参数传递只是隐式的赋值，因为我们传递的是方法，这是一个隐式引用赋值，所以结果跟上一个没有区别。

      那如果你传递的回调不是你自己的，而是语言内置的呢？结果是一样的

      ```js
      function foo() {
        console.log( this.a );
      }

      var obj = {
        a: 2,
        foo: foo
      };

      var a = "oops, global"; // `a` also property on global object

      setTimeout( obj.foo, 100 ); // "oops, global"

      // 可以把它假想成下面这样
      function setTimeout(fn,delay) {
        // wait (somehow) for `delay` milliseconds
        fn(); // <-- call-site!
      }
      ```
      可见，函数回调时会失去this绑定是一件很常见的事，但让我们惊讶的是我们传递的回调在调用中改变了this。不论以哪种方式，你都无法掌控你的回调引用将被如何被执行，下面是我们修复this绑定游离的方式。


- 显示绑定

    所有函数类都有一个可用工具，来绑定this

    ```js
    function foo() {
      console.log( this.a );
    }

    var obj = {
      a: 2
    };

    foo.call( obj ); // 2
    ```

    如果你只是传了一个基本类型的值（string，number，boolean）作为bind的参数，这个值将被包装为对象，new String() new Number()等等，call和apply在this的绑定上没有区别。

    遗憾的是，显示绑定仍然没有解决前面提到的问题，比如函数丢失它预期的this，

    - 强制绑定
  
      但是有一个变异了的显示绑定确实奏效
      ```js
      function foo() {
        console.log( this.a );
      }

      var obj = {
        a: 2
      };

      var bar = function() {
        foo.call( obj );
      };

      bar(); // 2
      setTimeout( bar, 100 ); // 2

      // `bar` hard binds `foo`'s `this` to `obj`
      // so that it cannot be overriden
      bar.call( window ); // 2
      ``` 
      这种强绑定直接定死了了调用时的this，最常见的强绑定方式如下：

      ```js
      function foo(something) {
        console.log( this.a, something );
        return this.a + something;
      }

      var obj = {
        a: 2
      };

      var bar = function() {
        return foo.apply( obj, arguments );
      };

      var b = bar( 3 ); // 2 3
      console.log( b ); // 5
      ```

      强绑定如此好用，可以用es5内置的bind来实现，bind返回的就是类似于上面这种的方法，来强制this设定
      ```js
      function foo(something) {
        console.log( this.a, something );
        return this.a + something;
      }

      var obj = {
        a: 2
      };

      var bar = foo.bind( obj );

      var b = bar( 3 ); // 2 3
      console.log( b ); // 5
      ```

    - API 调用 context

      在很多内置的JS方法中，都给上下文预留了一个参数位置，来让那你没有必要来调用bind确保this
      ```js
      function foo(el) {
        console.log( el, this.id );
      }

      var obj = {
        id: "awesome"
      };

      // use `obj` as `this` for `foo(..)` calls
      [1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome

      Array.forEach((value, key)=>{

      }, this)
      ```






- 新建绑定

  这种方法需要我们重新思考一个对函数和对象的常见无解

  传统的面向对象语言，constructors是class的一个特殊的方法，当调用new的时候，这个方法会被自动调用。我们来重新定义下js中constructor的含义：constructor只是在new的时候调用的一个方法，他们不从属于类，也不是类的实例，他们就是一个普通的函数。

  很多常用的功能函数，甚至内建的函数比如Number()这种，都能跟着new字符被调用，并称之为构造方法。不过事实上，真的没有称之为构造函数的东西，只是construction在调用方法。

  当new被调用的时候，下面4步会发生。

    - 一个崭新的对象被新建 {}
    - {} 被 [[Prototype]] 链接
    - {} 被当做函数调用的this
    - 除非函数返回自己的对象，否则函数返回这个{}


    
    ```js
    function foo(a) {
      this.a = a;
    }

    var bar = new foo( 2 );
    console.log( bar.a ); // 2
    ```
    ↑ 通过调用new foo()，我们创建了一个新对象，并把这个对象绑定为foo的this，所以new是最后一个能发现函数调用this的方法

---
### 井然有序
现在来捋一下上面4条的顺序，不可否定，缺省绑定是最低优先级的，所以我们放一边先。
Everything In Order
```js
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

