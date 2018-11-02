var assert = require('assert');
var should = require('should');

// 断言对象存在
describe('should断言： exist', ()=>{
  it('{}存在', ()=>{
    should.exist({})
  });
  it('[]存在', ()=>{
    should.exist([])
  });
  it('1存在', ()=>{
    should.exist(1)
  });
  it('null不存在', ()=>{
    should.not.exist(null)
  });
  it('undefined不存在', ()=>{
    should.not.exist(undefined)
  });
});


// 断言对象不存在
describe('should断言： not.exist', ()=>{
  it('null不存在', ()=>{
    should.not.exist(null)
  });
  it('void 0 不存在', ()=>{
    should.not.exist(void 0)
  });
});


// 断言bool值，必须是true、false
describe('should断言： .false()/.true()', ()=>{
  it('fasle为false', ()=>{
    (false).should.be.false();
    (true).should.be.true();
    (true).should.not.be.false();
    (false).should.not.be.true();
  });
});


// 断言js表达式为true
describe('should断言： ok', ()=>{
  it('NaN不为true', ()=>{
    (NaN).should.not.be.ok;
    (1).should.be.ok;
    should(false).not.be.ok();
    should({}).be.ok();
  });
})


// 判断父亲是否包含孩子,两种模式对应是否有顺序要求
describe('should断言： containDeep', ()=>{
  it('containDeep', ()=>{
    [1,2,3].should.containDeep([2,1]);
    [1,2,[1,2,3]].should.containDeep([1,[3,1]]);
    ({a:1,b:{c:1,d:[1,2,3]}}).should.containDeep({b:{d:[1]}});
    ({b:{c:1,d:[1,2,3]},a:1}).should.not.containDeepOrdered({b:{d:[3,1]}});
    [ 1, 2, 3].should.not.containDeepOrdered([2, 1]);
  });
})

// 判断同级是否包含
describe('should断言： containEql', ()=>{
  it('containEql', ()=>{
    [1, 2, 3].should.containEql(1);
    [{ a: 1 }, 'a', 10].should.containEql({ a: 1 });
    'abc'.should.containEql('b');
    'ab1c'.should.containEql(1);
  });
})

// equal ===
describe('should断言： equal', ()=>{
  it('equal', ()=>{
    (10).should.be.eql(10);
    ('10').should.not.be.eql(10);
    (-0).should.be.eql(+0);

    NaN.should.be.eql(NaN);

    ({ a: 10}).should.be.eql({ a: 10 });
    [ 'a' ].should.not.be.eql({ '0': 'a' });
  });
})

//  equalOneOf 其中一个满足 ===
//  oneOf 调用 eql
describe('should断言： equalOneOf', ()=>{
  it('equalOneOf', ()=>{
    'ab'.should.be.equalOneOf('a', 10, 'ab');
    'ab'.should.be.equalOneOf(['a', 10, 'ab']);

    'ab'.should.be.oneOf('a', 10, 'ab');
    'ab'.should.be.oneOf(['a', 10, 'ab']);
  });
  it('oneOf', ()=>{
    ({a: 10}).should.not.be.equalOneOf('a', 10, 'ab', {a: 10});
    ({a: 10}).should.not.be.equalOneOf(['a', 10, 'ab', {a: 10}]);

    ({a: 10}).should.be.oneOf('a', 10, 'ab', {a: 10});
    ({a: 10}).should.be.oneOf(['a', 10, 'ab', {a: 10}]);
  });
})




//  match
describe('should断言： match', ()=>{
  it('match', ()=>{

    'foobar'.should.match(/^foo/);

    ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);

    ['a', 'b', 'c'].should.match(/[a-z]/);

    (5).should.not.match(function(n) {
      return n < 0;
    });

    ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 })
    .should
    .match({ a: 10, b: /c$/, c: function(it) {
      return it.should.have.property('d', 10);
    }});

    var myString = {};

    // this will pass
    myString.should.match(/abc/);  
    // 如果没有key属性就会通过,所以可以如下

    // this will not pass
    assert.throws(()=>{
      myString.should.be.an.Object().and.not.be.empty().and.match(/abc/)
    })
    

    // (new Error('boom')).should.match(/abc/);//passed because no keys
    // (new Error('boom')).should.not.match({ message: /abc/ }).should.throw(AssertionError);//check specified property

  })
})



//  任何一个给出的对象值 或者数组 满足给出的规则
describe('should断言： matchAny', ()=>{
  it('matchAny', ()=>{
    [ 'a', 'b', 'c'].should.matchAny(/\w+/);
    [ 'a', 'b', 'c'].should.matchAny('a');
    [ 'a', 'b', 'c'].should.matchAny(function(value) { 
      value.should.be.eql('a') 
    });
    ({ a: 'a', b: 'b', c: 'c' }).should.matchAny(function(value) { 
      value.should.be.eql('a') 
    });
  });
})



//  所有给出的对象值 或者数组 满足给出的规则
describe('should断言： matchEach', ()=>{
  it('matchEach', ()=>{
    [ 'a', 'b', 'c'].should.matchEach(/\w+/);
    [ 'a', 'a', 'a'].should.matchEach('a');
    [ 'a', 'a', 'a'].should.matchEach(function(value) { value.should.be.eql('a') });
    ({ a: 'a', b: 'a', c: 'a' }).should.matchEach(function(value) { value.should.be.eql('a') });
  });
})



//  类型判断
describe('should断言： Infinity | NaN', ()=>{
  it('Infinity | NaN', ()=>{
    (10).should.not.be.Infinity();
    NaN.should.not.be.Infinity();
    (10).should.not.be.NaN();
    NaN.should.be.NaN();
  });
})


//  所有给出的对象值 或者数组 满足给出的规则
describe('should断言： Infinity | NaN', ()=>{
  it('Infinity | NaN', ()=>{
    (10).should.not.be.Infinity();
    NaN.should.not.be.Infinity();
    (10).should.not.be.NaN();
    NaN.should.be.NaN();
  });
})



//  大小比较
describe('should断言： above | aboveOrEqual | approximately | below | belowOrEqual | within', ()=>{
  it('Infinity | NaN', ()=>{
    (10).should.be.above(0);

    (10).should.be.aboveOrEqual(0);
    (10).should.be.aboveOrEqual(10);

    (9.99).should.be.approximately(10, 0.1);

    (0).should.be.below(10);

    (0).should.be.belowOrEqual(10);
    (0).should.be.belowOrEqual(0);

    (10).should.be.within(0, 20);
  });
})




//  Promise
describe('should断言： Promise', ()=>{
  it('Promise', ()=>{
    (new Promise((resolve, reject) =>{ 
      resolve(10); 
    })).should.be.a.Promise();
    (10).should.not.be.a.Promise();
  });
})



// key
describe('should断言： key | length', ()=>{
  it('key', ()=>{
    ({ a: 10 }).should.have.keys('a');
    ({ a: 10, b: 20 }).should.have.keys('a', 'b');
    (new Map([[1, 2]])).should.have.key(1);

  });
  it('length', ()=>{
    // length属性
    [1, 2].should.have.length(2);
  });
})



describe('should断言： value', ()=>{
  it('key', ()=>{
    ({ a: 10 }).should.have.value('a', 10);
    (new Map([[1, 2]])).should.have.value(1, 2);
  });
})



