
<a href="#should.js 部分释义">should.js 部分释义</a>


# node assert
assert是node中自带的一个模块，用于断言测试。[node - assert章节](http://nodejs.cn/api/assert.html)

```js
const assert = require('assert');

assert.equal(1, 1);
assert.deepStrictEqual({ a: 1 }, { a: 1 });
```


# mocha
mocha是一个能够在浏览器和node上运行的测试框架。其中describe表示一组相关的测试，it表示一个单元测试。[mocha官网](https://mochajs.org/)，[廖雪峰mocha](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00147204317563462840426beb04a849ba813eb46bb347c000)




# should.js
should是一个断言库，它与框架无关。相比assert更强更有用
```js
var should = require('should');
(5).should.be.exactly(5).and.be.a.Number();
```


# TDD和BDD的差别
- 单元测试

  针对一个模块或者函数的测试，叫做单元测试。基本原则是：不同的功能点并且相互之间没有依赖

- TDD

  测试驱动开发。首先写测试用例，测试的过程中逐步完成代码，开发顺利的话所有测试通过

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

  行为驱动开发。相比TDD的测试用例，我们用的是需求文档和行为来驱动开发

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
Karma是Google的一套测试运行框架，它会启动一个web服务器，用来运行测试脚本



# Travis CI
Travis CI是在线托管的CI服务，用Travis来进行持续集成，不需要自己搭服务器，在网页上点几下就好，用起来更方便。最重要的是，它对开源项目是免费的



# should.js 部分释义
- should.exist

  断言对象存在
  ```js
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
    it('void 0 不存在', ()=>{
      should.not.exist(void 0)
    });
  });
  ```

- should.false() | true()

  判断是否为布尔值
  ```js
  describe('should断言： .false()/.true()', ()=>{
    it('fasle为false', ()=>{
      (false).should.be.false();
      (true).should.be.true();
      (true).should.not.be.false();
      (false).should.not.be.true();
    });
  });
  ```



- should.ok

  判断对象的js表达式的值是否为true
  ```js
  describe('should断言： ok', ()=>{
    it('NaN不为true', ()=>{
      (NaN).should.not.be.ok;
      (1).should.be.ok;
      should(false).not.be.ok();
      should({}).be.ok();
    });
  })
  ```


- should.containDeep | containDeepOrdered

  同级或子级是否包含对象，后者对顺序进行了限制
  ```js
  describe('should断言： containDeep', ()=>{
    it('containDeep', ()=>{
      [1,2,3].should.containDeep([2,1]);
      [1,2,[1,2,3]].should.containDeep([1,[3,1]]);
      ({a:1,b:{c:1,d:[1,2,3]}}).should.containDeep({b:{d:[1]}});

      ({b:{c:1,d:[1,2,3]},a:1}).should.not.containDeepOrdered({b:{d:[3,1]}});
      [1,2,3].should.not.containDeepOrdered([2, 1]);
    });
  })
  ```

- should.containEql

  同级是否包含元素
  ```js
  describe('should断言： containEql', ()=>{
    it('containEql', ()=>{
      [1, 2, 3].should.containEql(1);
      [{ a: 1 }, 'a', 10].should.containEql({ a: 1 });
      'abc'.should.containEql('b');
      'ab1c'.should.containEql(1);
    });
  })
  ```


- should.equal

  相当于===比较符
  ```js
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
  ```


- should.equalOneOf
- should.oneOf

  体会两者不同之处，都是做值得比较的
  ```js
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
  ```


- should.match

  检验值是否匹配某种规则
  ```js
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
  ```


- should.matchAny

  任何一个给出的对象值 或者数组 满足给出的规则
  ```js
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
  ```


- should.matchEach

  所有给出的对象值 或者数组 满足给出的规则
  ```js
  describe('should断言： matchEach', ()=>{
  it('matchEach', ()=>{
      [ 'a', 'b', 'c'].should.matchEach(/\w+/);
      [ 'a', 'a', 'a'].should.matchEach('a');
      [ 'a', 'a', 'a'].should.matchEach(function(value) { value.should.be.eql('a') });
      ({ a: 'a', b: 'a', c: 'a' }).should.matchEach(function(value) { value.should.be.eql('a') });
    });
  })
  ```


- should.Infinity
- should.NaN

  类型判断
  ```js
  describe('should断言： Infinity | NaN', ()=>{
    it('Infinity | NaN', ()=>{
      (10).should.not.be.Infinity();
      NaN.should.not.be.Infinity();
      (10).should.not.be.NaN();
      NaN.should.be.NaN();
    });
  })
  ```


- should.above | aboveOrEqual | approximately | below | belowOrEqual | within

  大小比较
  ```js
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
  ```



- should.Promise
  Promise返回判断
  ```js
  describe('should断言： Promise', ()=>{
    it('Promise', ()=>{
      (new Promise((resolve, reject) =>{
        resolve(10);
      })).should.be.a.Promise();
      (10).should.not.be.a.Promise();
    });
  })
  ```



- should.key
  判断对象的key，和length属性
  ```js
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
  ```


- should.value
  判断对象是否含有value
  ```js
  describe('should断言： value', ()=>{
    it('key', ()=>{
      ({ a: 10 }).should.have.value('a', 10);
      (new Map([[1, 2]])).should.have.value(1, 2);
    });
  })
  ```


# vue-cli3.0集成mocha
> $ vue add @vue/unit-mocha
> $ npm run test:unit

[get more @](https://vue-test-utils.vuejs.org/zh/api/wrapper/#isempty)

它会自动在项目中生成一个与src同级的test目录

这是一个组件的demo，针对这个demo写了下面几个测试用例
```html
<template>
  <div class='ele-wrap'>
    <div class="input-wrap">

      <label class="label">
        {{label}}
      </label>

      <input
        :type="inputType"
        class="input"
        v-model="value"
        @input="onInput"
        @blur="onBluer"
        @focus="onFocus"
        />

      <span
        class='clear'
        @click="onClear"></span>



    </div>
    <div class='err-msg' v-if='errMsg'>{{errMsg}}</div>

    <button @click="toAsync">
         异步测试：{{asyncResult}}
      </button>
  </div>
</template>

<script>
export default {

  data(){
    return {
      errMsg:'',
      reg:'',
      value:'',
      asyncResult:false
    }
  },
  props: {
    type: String,
    label: String,
    name: String
  },
  mounted(){

  },
  computed:{
    inputType: function(){
      switch (this.type) {
        case 'phone':
          return 'number'
          break;
        case 'mail':
          return 'text'
          break;
        default:
          return 'text'
          break;
      }
    },
    inputReg: function(){
      switch (this.type) {
        case 'phone':
          return /^1[34578]\d{9}$/;
          break;
        case 'mail':
          return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          break;
        default:
          return 'text'
          break;
      }
    },
    inputError: function(){
      switch (this.type) {
        case 'phone':
          return '请输入正确的手机号';
        case 'mail':
          return '请输入正确的邮箱';
        default:
          return 'text'
      }
    }
  },
  methods:{
    onInput(){
      console.log(1111);
    },
    onBluer(){
      let result = this.inputReg.test(this.value)
      if(!result){
        this.errMsg = this.inputError
        this.$emit('Parblur', this.name, '')
      }else{
        this.$emit('Parblur', this.name, this.value)
      }

    },
    onFocus(){
      this.errMsg = ''
    },
    onClear(){
      this.$emit('blur', this.name, this.value)
      this.value = '';
      this.errMsg = '';
    },
    async toAsync(){
      // var result = await new Promise((resolve, reject)=>{
      //   setTimeout(() => {
      //     resolve(true);
      //   }, 0);
      // });
      // $.ajax({
      //   type: "GET",
      //   url: "https://raw.githubusercontent.com/FE-star/exercise1/master/test/test.js",
      //   success: (res) => {
      //     console.log(res.slice(0, 10))
      //     this.asyncResult = true;
      //   }
      // })
      var result = await Promise.resolve(true)
      this.asyncResult = true;
    },

  }
};
</script>
```


这是对应的几个测试用例
```js

import should from 'should'
import { shallowMount, mount } from '@vue/test-utils'
import Input from '@/components/input.vue'

describe('Input UI&交互 test', () => {
  const wrapper = shallowMount(Input, { propsData: { type: 'phone', value: 'clear-test' } });

  it('组件应该包含div', () => {
    wrapper.html().should.match(/div/);
  });

  it('点击clear应该清除data.value', () => {
    const button = wrapper.find('span');
    button.trigger('click');
    (wrapper.vm.value).should.be.eql('')
  })

  it('注入props.type为phone，会返回手机号校验正则', () => {
    ('13200000000').should.match((wrapper.vm.inputReg))
  })

  it('输入错的data，会有提示错误信息', () => {
    wrapper.find('input').trigger('blur');
    (wrapper.vm.errMsg).should.be.ok()
  })
})


describe('Input事件 test', () => {
  const wrapper = shallowMount(Input, { propsData: { type: 'phone' } });

  it('失去焦点时会emit一次父方法', () => {
    wrapper.find('input').trigger('focus');
    wrapper.find('input').trigger('blur');
    wrapper.emitted().Parblur.length.should.above(0)
  })

  it('获得焦点时，会清空错误提示', () => {
    wrapper.setData({ errMsg: '测试错误信息' });
    wrapper.find('input').trigger('focus');
    (wrapper.vm.errMsg).should.be.eql('')
  })
})



describe('Input异步 test', () => {
  const wrapper = shallowMount(Input, { propsData: { type: 'phone' } });

  it('点击异步按钮时，会异步改变结果？？', (done) => {
    wrapper.find('button').trigger('click')
    wrapper.vm.$nextTick(() => {
      (wrapper.vm.asyncResult).should.be.true();
      done();
    })
  })

})
```

![avatar](https://github.com/LiuYashion/amateur-study/blob/master/practice-001/result.png)
