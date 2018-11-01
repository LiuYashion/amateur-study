
# node assert的用法
> ./index.js
assert是node中自带的一个模块，它提供了断言测试的函数，用于测试不变库。[node-assert章节](http://nodejs.cn/api/assert.html)



```js

/** 
 * 1.0.0
 * assert 语法 
 * */
const assert = require('assert');

assert.equal(1, 1);
assert.deepStrictEqual({ a: 1 }, { a: 1 });


/**
 * 1.0.1
 * should 语法
 */
var should = require('should');
(5).should.be.exactly(5).and.be.a.Number();


/**
 * 1.0.2
 * should 语法
 */
```


# mocha 测试
> ./tests/one-test.js

mocha是一个能够在浏览器和node上运行的测试框架。

[mocha官网](https://mochajs.org/)

[廖雪峰mocha](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00147204317563462840426beb04a849ba813eb46bb347c000)

# should.js 
> ./index.js

should是一个断言库，它与框架无关。相比assert更强更有用



# TDD和BDD的差别