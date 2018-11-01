
# Node assert的用法
*./index.js*

assert是node中自带的一个模块，它提供了断言测试的函数，用于测试不变库。

[node - assert章节](http://nodejs.cn/api/assert.html)

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
*./tests/one-test.js*

mocha是一个能够在浏览器和node上运行的测试框架。

[mocha官网](https://mochajs.org/)

[廖雪峰mocha](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00147204317563462840426beb04a849ba813eb46bb347c000)

# should.js 
*./index.js*

should是一个断言库，它与框架无关。相比assert更强更有用



# TDD和BDD的差别
- 单元测试

  针对一个模块或者函数的测试，叫做单元测试。基本原则是：不同的功能点并且相互之间没有依赖

- TDD
  > 测试驱动开发。首先写测试用例，测试的过程中逐步完成代码，开发顺利的话所有测试通过

  我们以TDD模式开发一个阶乘函数
  ```js
  // 测试文件
  var assert = require('assert'),
    factorial = require('../index');
  suite('Test', function (){
    setup(function (){
      // Create any objects that we might need
    });
    suite('#factorial()', function (){
      test('equals 1 for sets of zero length', function (){
        assert.equal(1, factorial(0));
      });
      test('equals 1 for sets of length one', function (){
        assert.equal(1, factorial(1));
      });
      test('equals 2 for sets of length two', function (){
        assert.equal(2, factorial(2));
      });
      test('equals 6 for sets of length three', function (){
        assert.equal(6, factorial(3));
      });
    });
  });

  // 阶乘函数
  module.exports = function (n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };
  ```

- BDD
  > 行为驱动开发。相比TDD的测试用例，我们用的是需求文档和行为来驱动开发

  我们以TDD模式开发一个阶乘函数
  ```js
  // 测试文件
  var assert = require('assert'),
    factorial = require('../index');
  describe('Test', function (){
    before(function(){
      // Stuff to do before the tests, like imports, what not
    });
    describe('#factorial()', function (){
      it('should return 1 when given 0', function (){
        factorial(0).should.equal(1);
      });
      it('should return 1 when given 1', function (){
        factorial(1).should.equal(1);
      });
      it('should return 2 when given 2', function (){
        factorial(2).should.equal(2);
      });
      it('should return 6 when given 3', function (){
        factorial(3).should.equal(6);
      });
    });
    after(function () {
      // Anything after the tests have finished
    });
  });
  ```

  可以发现，BDD更关注需求功能，而不是实际结果。BDD相对于TDD更适合软件开发。最终决策要依据测试框架与同事之间更倾向于哪种方式


# Karma
*./*

Karma是Google的一套测试运行框架，它会启动一个web服务器，用来运行测试脚本



# Travis CI
*./*
Travis CI是在线托管的CI服务，用Travis来进行持续集成，不需要自己搭服务器，在网页上点几下就好，用起来更方便。最重要的是，它对开源项目是免费的