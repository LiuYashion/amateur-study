# Generator 把他理解为状态机就行
- 形式上： Generator函数是一个普通的函数，不过相对于普通函数多出了两个特征。一是在function关键字和函数明之间多了'*'号；二是函数内部使用了yield表达式，用于定义Generator函数中的每个状态。

- 语法上： Generator函数封装了多个内部状态(通过yield表达式定义内部状态)。执行Generator函数时会返回一个遍历器对象(Iterator对象)。也就是说，Generator是遍历器对象生成函数，函数内部封装了多个状态。通过返回的Iterator对象，可以依次遍历(调用next方法)Generator函数的每个内部状态。

- 调用上： 普通函数在调用之后会立即执行，而Generator函数调用之后不会立即执行，而是会返回遍历器对象(Iterator对象)。通过Iterator对象的next方法来遍历内部yield表达式定义的每一个状态。

## demo
yield表达式也有两种作用：定义内部状态和暂停执行

```js
function *gen () {
  let foo = yield 1
  foo = foo*2
  yield foo/2
  yield 50
  return 3
}

const g = gen()   // Iterator对象
g.next()          // {value: 1, done: false}
g.next(20)        // {value: 20, done: false}
g.next(20)        // {value: 50, done: true}
g.next()          // {value: 3, done: true}
g.next()          // {value: undefined, done: true}
```
从结果能看出，执行一次next状态就变化一次。仔细看传的值，传入的参数会被当做上一个yeild表达式的值，

# async | await



async 函数，就是 Generator 函数的语法糖。

这两个关键字用于写异步函数的时候使用。比如下一次请求会依赖上一次请求的内容时，就可以使用await等待，而不用再写链式调用。

- 凡是在前面添加了async的函数在执行后都会自动返回一个Promise对象
- await必须在async函数里使用，不能单独使用
- await后面需要跟Promise对象，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数
- await会使它之后的代码变成同步的

## demo
```js
/** 我们定义一个成功失败五五开的方法 */
async function asyncResult() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (Boolean(Math.round(Math.random()))) {
    return 'Finish'
  }
  throw Error('Error')
}

/** 我们来合理调用它 */
async function foo() {
  try {
    return await asyncResult()
  }
  catch (e) {
    // 错误也是能够捕获的，因为我们在try中等待了asyncResult
    return 'caught'
  }
}
```

下面这个例子可以用来看看，代码的执行顺序
```js
console.log(1)
let promiseDemo = new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
        let random = Math.random()
        if (random >= 0.2) {
            resolve('success')
            console.log(3)
        } else {
            reject('failed')
            console.log(3)
        }
    }, 1000)
})

async function test() {
    console.log(4)
    let result = await promiseDemo
    return result
}

test().then(result => {
    console.log(5)
}).catch((result) => {
    console.log(5)
})
console.log(6)
```



# Promise
new Promise的时候，内部代码就会执行

## demo
promise内的代码会立即执行，
```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 1000)
})
```

## 这里看几个并发，竞态的api
```js
/**
  Promise.all()
  全都都resolve了才会执行
 */
let promise1 = Promise.resolve(3)
let promise2 = 4
let promise3 = new Promise(resolve=>{
  setTimeout(()=>{
    resolve(6)
  },1000)
})
Promise.all([promise1, promise2, promise3]).then(result => {
  console.log(result) // [3, 4, 6]
})


/**
  Promise.race()
  最先完成的返回
 */
let promise1 = Promise.resolve(3)
let promise2 = 4
let promise3 = new Promise(resolve=>{
  setTimeout(()=>{
    resolve(6)
  },1000)
})
Promise.race([promise1, promise2, promise3]).then(result => {
  console.log(result) // 3
})


/**
  Promise.finally()
  最后总会执行
 */
new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject(6)
  },1000)
}).then(res => {
  console.log(1, res)
}).catch(error => {
  console.log(2, error)
}).finally( () => {
  console.log(3, res)
})



```




https://juejin.im/post/5c39523651882525a67c53d6
