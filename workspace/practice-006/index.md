# template模板
dom api十分强大但是难以操作,现代前端框架做了这么多就是为了屏蔽dom的操作

### innerHTML
不能信赖的内容，使用innerText比较安全。

### $.html()字符串模板的转换


### mark.js
https://marked.js.org/#/README.md#README.md


### 了解一下react/vue的模板引擎







# webpack

## concepts

### 1）loaders 
作为开箱即用的自带特性，webpack 自身只支持 JavaScript。而 loader 能够让 webpack 处理那些非 JavaScript 文件，并且先将它们转换为有效 模块，然后添加到依赖图中，这样就可以提供给应用程序使用
```js
const path = require('path');

module.exports = {
    ...
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
    ...
};
```

### 2）plugins
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务，插件的范围包括：打包优化、资源管理和注入环境变量
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    module: {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
    ...
};
```

### 3）model
通过将 mode 参数设置为 development, production 或 none，可以启用对应环境下 webpack 内置的优化。默认值为 production
```js
module.exports = {
    mode: 'production'
};
```

### 4）兼容性
webpack 支持所有 ES5 兼容（IE8 及以下不提供支持）的浏览器。webpack 的 import() 和 require.ensure() 需要环境中有 Promise。如果你想要支持旧版本浏览器，你应该在使用这些 webpack 提供的表达式之前，先 加载一个 polyfill


# 介绍

### 1）CommonsChunkPlugin
```js
new CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
}),
```

### 2）babel-loader
```js
module: {
    rules: [
        {
            test: /\.js$/,
            include: __dirname + '/src',
            use: 'babel-loader'
        }
    ]
}
```

### 3）entry
```js
entry: {
    /**
     * 定义了多个入口文件
     */
    home: './home',
    user: ['./user', './account']
}
```

### 4）样式处理
style-loader 样式加载器
```js
module: {
    rules: [{
        test: /\.css$/,
        include: [
            __dirname + '/src'
        ],
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['style-loader', 'css-loader', 'autoprefixer-loader']
        })
    }]
}


```

### 5）vendor
```js
entry: {
    app: './',
    vendor: ['jquery', 'underscore'],
},
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
]
```

### 6）chunkFile
打异步chunk
```js
module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.bundle.js',
    chunkFilename: '[name].bundle.js'
  }
}

require(['./async/index'], function (require) {
    require('./async/index').init()
})
```



