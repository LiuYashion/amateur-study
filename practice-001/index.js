
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