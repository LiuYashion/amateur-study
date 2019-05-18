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