
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

水电费

<!-- Indirection -->







---
### this的范围
