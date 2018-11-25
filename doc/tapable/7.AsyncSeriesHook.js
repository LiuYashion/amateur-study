const {
    AsyncSeriesHook
} = require("tapable");

/**
 * 异步串行
 * 不关系callback()的参数
 */

// tap
let queue3 = new AsyncSeriesHook(['name']);
console.time('cost3');
queue3.tapPromise('1',function(name){
   return new Promise(function(resolve, reject){
       setTimeout(function(){
           console.log(name, 1);
           resolve();
       },1000)
   });
});
queue3.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(name, 2);
            resolve();
        },2000)
    });
});
queue3.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(name, 3);
            resolve();
        },3000)
    });
});
// queue3.promise('webapck').then(err=>{
//     console.log(err);
//     console.timeEnd('cost3');
// });

// 执行结果
/* 
webapck 1
webapck 2
webapck 3
undefined
cost3: 6021.817ms
*/

// 结果
class AsyncSeriesHook_MY {
    constructor() {
        this.hooks = [];
    }

    tapAsync(name, fn) {
        this.hooks.push(fn);
    }
    tapPromise(name, fn) {
        this.hooks.push(fn);
    }
    promise(){
        return Promise.resolve(...arguments)
    }
    callAsync() {
        var self = this;
        var args = Array.from(arguments);
        let done = args.pop();
        let idx  = 0;

        function next(err) {
            // 如果next的参数有值，就直接跳跃到 执行callAsync的回调函数
            if (err) return done(err);
            let fn = self.hooks[idx++];
            fn ? fn(...args, next) : done();
        }
        next();
    }
}
console.time('cost3');

var test = new AsyncSeriesHook_MY()
test.tapPromise('1', function(name){
   return new Promise(function(resolve, reject){
       setTimeout(function(){
           console.log(name, 1);
           resolve();
       },1000)
   });
});
test.tapPromise('2', function(name, callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(name, 2);
            resolve();
        },2000)
    });
});
test.tapPromise('3', function(name, callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(name, 3);
            resolve();
        },3000)
    });
});
test.callAsync('webpack', (err) => {
    console.log(err);
    console.log('over');
    console.timeEnd('cost2');
}); 

test.promise('webapck').then(err=>{
    console.log(err);
    console.timeEnd('cost3');
});