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


## 那我们来看看一些api
- compilation.modules：一次构建中，模块组成的数组；
- module.fileDependencies：模块中源文件与依赖文件的路径；
- compilation.chunks：一次构建中，chunks组成的数组；
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

# 看看html-webpack-plugin

```js
class HtmlWebpackPlugin {
  constructor (options) {
  }

  apply (compiler) {
    /**
     *  此处对文件的路径做了处理
     */
  }
}
```
