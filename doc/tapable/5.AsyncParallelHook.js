const {
    AsyncParallelHook
} = require("tapable");

/**
 *  它有三种发布模式
 *  tap	        callAsync
 *  tapAsync    callAsync
 *  tapPromise  promise
 * 
 *  不关心监听函数的返回值。
 */

let queue3 = new AsyncParallelHook(['name']); /** 【异步并行】 */

console.time('cost3');

queue3.tapPromise('1', function (name, cb) {
   return new Promise(function (resolve, reject) {
       setTimeout(() => {
           console.log(name, 1);
           resolve();
       }, 3000);
   });
});

queue3.tapPromise('2', function (name, cb) {
   return new Promise(function (resolve, reject) {
       setTimeout(() => {
           console.log(name, 2);
           resolve();
       }, 1000);
   });
});

queue3.tapPromise('3', function (name, cb) {
   return new Promise(function (resolve, reject) {
       setTimeout(() => {
           console.log(name, 3);
           resolve();
       }, 1000);
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
/* 
webpack 1
webpack 2
webpack 3
over
cost3: 3007.925ms
*/

//	4. 原理。push进去轮训
class AsyncParallelHook_MY {
    constructor() {
        this.hooks = [];
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
    promise() {
        return new Promise((resolve, reject)=>{
            this.hooks.forEach(hook => {
                resolve(hook(...arguments))
            });
        })
    }
}


let test = new AsyncParallelHook_MY()
test.tapPromise('1', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 1);
            resolve();
        }, 3000);
    });
});
 
test.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 2);
            resolve();
        }, 1000);
    });
});
 
test.tapPromise('3', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(name, 3);
            resolve();
        }, 1000);
    });
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