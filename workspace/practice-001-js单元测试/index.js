const assert = require('assert');

/**
 * #01
 * assert.ok(a) | assert(a)
 * 检测一个值是否为真
 *  */
assert.ok(1)
assert.ok(NaN, 'NaN不是真值')


/**
 * #02
 * assert.deepStrictEqual(a, b)
 * a,b参数深度是否相等
 * 
 * assert.notDeepStrictEqual(a, b)
 * 与deepStrictEqual相反
 * 
 * 1. 基本值的话SameValue比较
 * 2. 对象的话
 *      - 原型要相同
 *      - 解封装后的值要相同
 *  */
assert.deepStrictEqual(NaN, NaN);
assert.deepStrictEqual(new String('foo'), Object('foo'));
assert.deepStrictEqual(1, '1');
assert.deepStrictEqual(-0, +0);
assert.deepStrictEqual({ a: 1 }, { a: '1' });
assert.deepStrictEqual(new Number(1), new Number(2));


/**
 * #03
 * assert.doesNotReject(asyncFun)
 * 断言异步方法不会报错
 * 
 * assert.rejects(asyncFun)
 * 与之相反
 * v10.0.0+
 *  */
assert.doesNotReject(
  Promise.resolve()
).then(() => {
  // ...
});
assert.doesNotReject(()=>{
  throw new TypeError('Wrong value');
}).then(() => {
  // ...
});
assert.rejects(
  Promise.reject(new Error('Wrong value')),
  Error
).then(() => {
  // ...
});



/**
 * #04
 * assert.doesNotThrow(fn)
 * 断言异步方法不会报错
 * 
 * assert.throws(fn)
 * 与之相反
 *  */
// assert.doesNotThrow(()=>{
//   throw new TypeError('Wrong value');
// })
assert.throws(
  () => {
    const otherErr = new Error('Not found');
    otherErr.code = 404;
    throw otherErr;
  }
);

/**
 * #05
 * assert.strictEqual(a,b)
 * SameValue判断
 * 
 * assert.notStrictEqual(a, b)与之相反
 *  */
assert.strictEqual(1, '1'); // false


 /**
 * #06
 * assert.fail(message)
 * 抛出错误
 *  */
assert.fail('失败');
assert.fail(new TypeError('失败'));


 /**
 * #07
 * assert.ifError(value)
 * 如果value不为undefined/null，用于捕获错误
 *  */
let err;
(function errorFrame() {
  err = new Error();
})();

(function ifErrorFrame() {
  assert.ifError(err);
})();
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error
//     at ifErrorFrame (C:\Users\Administrator\Documents\GitHub\amateur-study\practice-001\index.js:86:10)
//     at Object.<anonymous> (C:\Users\Administrator\Documents\GitHub\amateur-study\practice-001\index.js:87:3)
//     at errorFrame (C:\Users\Administrator\Documents\GitHub\amateur-study\practice-001\index.js:82:9)


 /**
 * #08
 * 
 * 
 *  */
// 

// should.js 
should.deepEqual
should.doesNotThrow
should.equal
should.fail
should.ifError
should.notDeepEqual
should.ok
should.throws

should.exist
断言对象存在

should.not.exist
断言对象不存在

Assertion.false()