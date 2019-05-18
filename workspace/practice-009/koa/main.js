const Koa = require('koa');
const app = new Koa();

// response


const logger = (ctx, next) => {
  console.log(`${new Date().toLocaleString()}\n请求类型：${ctx.request.method} 请求路径：${ctx.request.url}`);
  next();
}

app.use(logger);
app.use(ctx => {
  ctx.body = 'Hello Koa~~~';
});

app.listen(3000);