
const ConcatSource = require('webpack-sources').ConcatSource

const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");


class DefPlugin {
  constructor(options){
    // 用户自定义配置
    this.options = options
  }
  apply(compiler) {

    /**
     * 同步串行
     */

    //  1.1 不关心返回值
    compiler.hooks.sHook = new SyncHook(['data'])
    compiler.hooks.sHook.tap('MyPlugin', (data) => {
      console.log(`      ->  ${3} ${data}`)
    })
    compiler.hooks.sHook.call("It's my plugin.")

    //  1.2 只要有一个监听有return值，就跳过所有
    compiler.hooks.sbHook = new SyncBailHook(['data'])
    compiler.hooks.sbHook.tap('MyPlugin1', (data) => {
      console.log(`      ->  ${1} ${data}`)
    })
    compiler.hooks.sbHook.tap('MyPlugin2', (data) => {
      console.log(`      ->  ${2} ${data}`)
      return null
    })
    compiler.hooks.sbHook.tap('MyPlugin3', (data) => {
      console.log(`      ->  ${3} ${data}`)
    })
    compiler.hooks.sbHook.call("It's my plugin.")

    // 1.3 上一个监听函数值能返回给下一个函数
    compiler.hooks.swfHook = new SyncWaterfallHook(['data'])
    compiler.hooks.swfHook.tap('listen1', (res) => {
      console.log(`      ->  ${1} ${res}`)
      return `${res} is`
    })
    compiler.hooks.swfHook.tap('listen2', (res) => {
      console.log(`      ->  ${2} ${res}`)
      return `${res} my best friend`
    })
    compiler.hooks.swfHook.tap('listen3', (res) => {
      console.log(`      ->  ${3} ${res}`)
    })
    compiler.hooks.swfHook.call('Henry')


    /**
     * 同步循环
     */
    // 2.1 返回undefined时退出，否则持续循环
    let loopCount = 0;
    compiler.hooks.slHook = new SyncLoopHook(['data'])
    compiler.hooks.slHook.tap('listen1', (res) => {
      loopCount++;
      console.log(`  loopCount->  ${loopCount}`)
      if (loopCount == 5) {
        return undefined;
      } else {
        return true;
      }
    })
    compiler.hooks.slHook.call('hey~')


    /**
     * 异步并发，不需要call来通知
     */
    // 3.1 不关心监听函数的返回值，异步执行结果
    compiler.hooks.apHook = new AsyncParallelHook(['data'])
    compiler.hooks.apHook.tap('listen1', (res) => {
      console.log(`      ->  ${1} ${res}`)
    })
    compiler.hooks.apHook.tap('listen1', (res) => {
      console.log(`      ->  ${2} ${res}`)
    })
    compiler.hooks.apHook.tap('listen1', (res) => {
      console.log(`      ->  ${3} ${res}`)
    })
    compiler.hooks.apHook.callAsync('listen1', (err)=>{

    })

    // 3.2 只要有return，就跳过所有，直接到回调函数
    compiler.hooks.apbHook = new AsyncParallelBailHook(['data'])
    compiler.hooks.apbHook.tap('listen1', (res) => {
      console.log(`      ->  ${1} ${res}`)
    })
    compiler.hooks.apbHook.tap('listen2', (res) => {
      console.log(`      ->  ${2} ${res}`)
      return 0;
    })
    compiler.hooks.apbHook.tap('listen3', (res) => {
      console.log(`      ->  ${3} ${res}`)
    })
    compiler.hooks.apbHook.callAsync('listen1', (res)=>{
      console.log(`      ->  callback ${res}`)
    })


    /**
     * 异步串行
     */
    // 4.1 不关心监听函数的返回值，异步执行结果
    compiler.hooks.asHook = new AsyncSeriesHook(['data'])
    compiler.hooks.asHook.tap('listen2', (res) => {
      console.log(`      ->  ${1} ${res}`)
    })
    compiler.hooks.asHook.tap('listen2', (res) => {
      console.log(`      ->  ${2} ${res}`)
    })
    compiler.hooks.asHook.tap('listen2', (res) => {
      console.log(`      ->  ${3} ${res}`)
    })
    compiler.hooks.asHook.callAsync('listen1', (err)=>{
      console.log(`      ->  callback ${err}`)
    })

    // 4.2 只要没有return值，就会一直触发绑定的回调
    compiler.hooks.asbHook = new AsyncSeriesBailHook(['data'])
    compiler.hooks.asbHook.tap('listen2', (res) => {
      console.log(`      ->  ${1} ${res}`)
    })
    compiler.hooks.asbHook.tap('listen2', (res) => {
      console.log(`      ->  ${2} ${res}`)
      return "Wrong";
    })
    compiler.hooks.asbHook.tap('listen2', (res) => {
      console.log(`      ->  ${3} ${res}`)
    })
    compiler.hooks.asbHook.callAsync('listen2', (err)=>{
      console.log(`      ->  callback ${err}`)
    })

    // 4.3 上一个叫监听函数的值可以传给下一个叫监听函数
    console.time('cost1');
    compiler.hooks.asbHook = new AsyncSeriesWaterfallHook(['data'])
    compiler.hooks.asbHook.tap('listen2', (res) => {
      console.log(`      ->  ${1} ${res}`)
      return `${res} is`
    })
    compiler.hooks.asbHook.tap('listen2', (res) => {
      console.log(`      ->  ${2} ${res}`)
      return `${res} a good teacher`
    })
    compiler.hooks.asbHook.tap('listen2', (res) => {
      console.log(`      ->  ${3} ${res}`)
    })
    compiler.hooks.asbHook.callAsync('Tony', (err)=>{
      console.timeEnd('cost1');
    })
  }
}

module.exports = DefPlugin


