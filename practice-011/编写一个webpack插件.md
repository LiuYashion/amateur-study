# 优势
通过插件，可以把webpack的功能全部暴露出去，通过不同的api创建回调，让开发者也能参与构建过程，写plugin比写loader高级


# webpack插件的基本结构
```js
function TestPlugin(options = {}) {
  console.log(222222222, options)
}

TestPlugin.prototype.apply = function (compiler) {
  // Setup callback for accessing a compilation:
  compiler.plugin("compilation", function(compilation) {
    // Now setup callbacks for accessing compilation steps:
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });
}

module.exports = TestPlugin
```

# 用途
插件允许你在webpack构建中发挥定制化：
- 创建自己的资源类型；
- 执行特殊的构建调整；
- 设置在使用中间件的时候进一步提升性能；
- 等等...

# 介绍两个对象

## compiler
代表整个webpack环境配置。启动时配置好并被建立，每个运行的插件，将会收到这个compiler的引用，可以通过它来访问webpack环境

## compilation
代表一次版本的构建。当运行webpack-dev-middleware时，梅检测到一次变化，就会创建一个新的构建版本（compilation），从而生成一组新的编译资源，它提供了很多有用的回调

## compiler.hooks.(..)
这里枚举一些钩子（遇到时可以查看文档）

- ### compile
  一个新的编译(compilation)创建之后，钩入(hook into) compiler
- ### compilation
  编译(compilation)创建之后，执行插件
- ### emit
  生成资源到 output 目录之前

...




# 那我们来看看一些api
- compilation.modules：一次构建中，模块组成的数组；
- compilation.chunks：一次构建中，chunks组成的数组；

- module.fileDependencies：模块中源文件与依赖文件的路径；


- chunk.modules：每个chunk里面的模块数组；
- chunk.files：每个chunk里面的输出文件名；

```js
TestPlugin.prototype.apply = function (compiler) {

  compiler.plugin('emit', function(compilation, callback) {

    compilation.chunks.forEach(function(chunk) {

      chunk.modules.forEach(function(module) {
        module.fileDependencies.forEach(function(filepath) {
        });
      });

      chunk.files.forEach(function(filename) {
        var source = compilation.assets[filename].source();
      });

    });
    callback();

  });

}
```

> validateOptions （schema-utils）
>
> 参数的一些校验方法，定义好模式，然后传入data检验

# tabable
tapable里面是各种同步异步对流程的控制，参看tapable

# 来看看几个插件吧~

## #1 BannerPlugin
```js
apply(compiler) {
  /** 构建完成之后执行 */
  compiler.hooks.compilation.tap('bannerPlugin', compilation => {
    /** 优化所有chunk的资源，资源被存在compilation.assets中 */
    compilation.hooks.optimizeChunkAssets.tap('bannerPlugin', chunks => {
      for (const chunk of chunks) {
        for (const file of chunk.files) {
          compilation.assets[file] = new ConcatSource(
            '\/**LiuYashion Banner**\/',
            "\n",
            compilation.assets[file]
          );
        }
      }
    })
  })
}
```

## #2 html-webpack-plugin
```js
apply(compiler) {

}
```










# 看看html-webpack-plugin
作用：
- 为html文件中引入的外部资源如script、link动态添加
- 每次compile后的hash，防止引用缓存的外部文件问题
- 可以生成创建html入口文件

原理：

将webpack中`entry`配置的相关入口的thunk。还有`extract-text-webpack-plugin`抽取的css样式。一起插入到该插件提供的`template`或者`templateContent`配置项指定的内容基础上。具体插入方式是将样式`link`插入到`head`元素中，`script`插入到`head`或者`body`中

几个概念：
- compiler：
- new WeakMap();
```js

```

```js
/**
 * 此处自己维护了一个childCompiler
 */
const childCompiler = require('./lib/compiler.js');

class HtmlWebpackPlugin {
  constructor (options) {
  }

  apply (compiler) {

    /** 此处对文件的路径做了处理 */

    // Clear the cache once a new HtmlWebpackPlugin is added
    childCompiler.clearCache(compiler);

    // 触发 compilation 事件之前执行
    compiler.hooks.thisCompilation.tap('HtmlWebpackPlugin', (compilation) => {
      /**
       * 1. 将template和【childCompiler】绑定起来
       */
    })

    // 异步并发
    compiler.hooks.make.tapAsync('HtmlWebpackPlugin', (compilation, callback) => {

    })

    // 生成资源到 output 目录之前
    compiler.hooks.emit.tapAsync('HtmlWebpackPlugin', (compilation, callback) => {

    })


  }
}
```
