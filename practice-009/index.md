# Node.js(1)

## koa中间件
启动koa，访问localhost:3000。这是一个打印日志信息的中间件
```js
const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${new Date().toLocaleString()}\n请求类型：${ctx.request.method} 请求路径：${ctx.request.url}`);
  next();
}

app.use(logger);
app.use(ctx => {
  ctx.body = 'Hello Koa~~~';
});

app.listen(3000);
```




## express中间件
启动express，访问localhost:3000。这是一个打印日志信息的中间件
```js
var express = require('express')
var app = express()

const logger = (request) => {
  console.log(`${new Date().toLocaleString()}\n请求类型：${request.method} 请求路径：${request.url}`);
}

app.use(logger);

app.use(function (req, res, next) {
  logger(req)
  next()
})
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```







## 内存更新策略
```js

```




##  LRU 原理
```js

```