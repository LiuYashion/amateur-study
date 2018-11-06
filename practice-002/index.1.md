
## This 1

this代表上下文对象，解释在文末。

---
### this本身
第一个困惑就是：this指向function本身。

什么情况下，你会想在函数的内部得到这个函数的引用？递归；在第一次被调用时能给自己解绑的事件处理函数。新手认为，引用函数作为一个对象，可以存储函数多次调用之间的状态。虽然功能有限，但这是可以实现的。（后面会介绍更好的方法）

现在我们来看看，为什么this并没有指向函数的引用
```js
/** method 1 */
function foo(num) {
  console.log( "foo: " + num );
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
↑ foo.count仍然是0，即时foo被调用了4次。这个this.count++是调用了什么？foo.count的确给函数对象增加了count属性。但是在函数中调用的this.count，this完全不是指向函数对象的，即时他们名称相同都是count。那么这里自增的count是什么？可以发现，这种操作无意间增加了一个值为NaN的全局变量。**这里留到Chapter 2中再讨论**。下面是避免这种问题的方法



```js
/** method 2 */
function foo(num) {
  console.log( "foo: " + num );
  data.count++;
}

var data = {
	count: 0
};
for (var i=0; i<10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
console.log( data.count ); // 4 ？？？
```
↑ 这种方法虽然只是解决了问题，但是忽略掉了真正的问题（缺少对this的词法作用域的理解）。词法作用域是一个很好用的机制。想要在函数内部引用它自身，this是不够的，你通常要引用一个词法定义的函数对象（或者一个变量）



```js
/** method 3 */
function foo() {
  foo.count = 4; // `foo` refers to itself
}

setTimeout( function(){
  // anonymous function (no name), cannot
  // refer to itself
}, 10 );
```
↑ 第一个是命名函数，foo是能够在函数内部使用的自身的引用。但在第二个例子中，调用的是匿名函数，也就没有合适的方法来获取函数自身的引用了

有一个被抛弃的老牌方法 arguments.callee，指向当前被调用的函数对象，这是唯一从匿名函数内部获取自身引用的方法。然而最好的方法是避免对匿名函数发起自身调用，或者至少命个名。arguments.callee是应该被废弃掉的。

所以我们的解决方法就变为：
```js
/** method 4 */
function foo(num) {
	console.log( "foo: " + num );
	// keep track of how many times `foo` is called
	foo.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```
↑ 然而这回避了对this的理解，而且依赖foo的词法作用域
```js
/** method 5 */
function foo(num) {
	console.log( "foo: " + num );
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo.call( foo, i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log( foo.count ); // 4
```
↑ 这种方法，强行让this指向了函数对象foo

---
### this的范围
还有一点令人困惑的就是，this可以表明函数的作用域。这很棘手，因为有的情况下是的，有的情况却是误导人的。这里要强调的是：this在任何情况下都不代表函数逇词法作用域。尽管在内部，作用域很像一个有每个可用定义属性的对象。但是作用域对象是js代码访问不到的。

看下面这个例子：
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
↑ 这里有多个错误。这是一段提炼过的代码，是一个很精彩的例子，告诉了this可以被怎样误导。

通过this.bar()来访问bar()是一个错误的做法，这句能起作用实属意外。最简单是方式是直接省略this.，然而这么写的人是企图在foo和bar之间建立作用域的联系，所以bar就可以在作用域链中访问到a，**这种连接是不存在的**，每当你把this和作用域混淆的时候，请提醒你自己，他们没有任何关联。


this是运行时绑定的，上下文是基于方法调用时的情况。this的绑定跟函数在哪里声明的没有关系，只跟函数调用方式有关。

当一个函数被调用时，一个execution context被记录下来，这个上下文包含了如下信息：函数在哪被调用，函数如何被调用，传了什么参数，等等。其中一个参数就是this，他引用了函数执行期间将被使用的东西；
 