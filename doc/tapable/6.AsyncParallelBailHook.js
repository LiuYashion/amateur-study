const {
    AsyncParallelBailHook
} = require("tapable");

/**
 *  它有三种发布模式
 *  tap	        callAsync
 *  tapAsync    callAsync
 *  tapPromise  promise
 * 
 *  只要监听函数的返回值不为 null，就会忽略后面的监听函数执行，直接跳跃到callAsync等触发函数绑定的回调函数，然后执行这个被绑定的回调函数。
 */

let queue3 = new AsyncParallelBailHook(['name']);
console.time('cost3');
queue3.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 1);
            resolve();
        }, 1000);
    });
});

queue3.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 2);
            reject('wrong');// reject()的参数是一个不为null的参数时，最后的回调就不会再调用了
        }, 2000);
    });
});

queue3.tapPromise('3', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 3);
            resolve();
        }, 3000);
    });
});

// queue3.promise('webpack')
// .then(() => {
//     console.log('over');
//     console.timeEnd('cost3');
// }, () => {
//     console.log('error');
//     console.timeEnd('cost3');
// });

// 执行结果:
/* 
webpack 1
webpack 2
error
cost3: 2009.970ms
webpack 3
*/

//	4. 原理。push进去轮训
class Example {
    constructor() {
        this.hooks = [];
        this.final = null;
    }
    // 订阅
    tap(name, fn) {
        this.hooks.push(fn);
    }
    tapAsync(name, fn) {
        this.hooks.push(fn);
    }
    tapPromise(name, fn) {
        this.hooks.push(fn);
    }
    // 发布
    // promise() {
    //     return new Promise((resolve, reject)=>{
    //         for(let i = 0; i < this.hooks.length; i++){

    //             let hook = this.hooks[i];

    //             hook(...arguments).then(resolve => {
    //                 console.log(111, resolve)
    //             }, reject => {
    //                 console.log(222, reject) 
    //                 if(reject){
    //                     return false;
    //                 }
    //             })

    //         }
    //     })
    // }
    // 最终回调注册  
    callAsync(name, fn){
        this.final = fn
    }
}

let test = new Example()
test.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 1);
            resolve();
        }, 1000);
    });
});
test.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 2);
            reject('wrong');// reject()的参数是一个不为null的参数时，最后的回调就不会再调用了
        }, 2000);
    });
});
test.tapPromise('3', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 3);
            resolve();
        }, 3000);
    });
});
test.callAsync('webpack', err => {
    console.timeEnd('cost');
});

console.time('cost0');
test.promise('webpack')
.then(() => {
    console.log('over');
    console.timeEnd('cost0');
}, () => {
    console.log('error');
    console.timeEnd('cost0');
});