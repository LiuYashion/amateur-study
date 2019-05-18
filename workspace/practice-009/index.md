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
一般项目中最耗性能的就是数据库了，但是数据库的读写频率是不平均的，读多写少。还有各种判断条件，like group join等等，这些语法是十分消耗性能的。

那么我们通过前置一个缓存服务，就能有效的吸收不均匀的服务，抵挡流量波峰，同时如果对应数据源不在同一个服务器下，服务器之间也会有很多网络消耗，同时也会影响到效率。

好，那现在就会【缓存数据】和【数据库数据】两份了，所以就会涉及到同步问题：

- 缓存的过期时间问题
- 缓存的命中率问题（70%）最佳
- 缓存的穿透/雪崩问题


```js

```




##  LRU 原理
Cache是是位于速度相差较大的两种硬件之间，用于协调两者数据传输速度差异的结构。Cache的容量也有限，所以当容量不足时，需要淘汰末尾数据。这里介绍几种淘汰算法。

- LRU
  
  新数据插入到链表头部，命中的数据移动到链表头部。在保存热点数据时，此算法表现很好，但是偶发性，周期性批量操作，就会导致命中率下降

- LRU-K

  增加了一个新的维度K，代表命中次数，打到K次的就添加到缓存队列中，每当缓存队列中命中，重新排一次

当然还有其他更加优越健壮的算法。




## mysql
```js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'example.org',
  user     : 'bob',
  password : 'secret'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
});

// 增加
var usr={name:'zhangsan',password:'pwdzhangsan',mail:'zhangsan@gmail.com'};
connection.query('insert into users set ?', usr, function(err, result) {
    if (err) throw err;

    console.log('inserted zhangsan');
    console.log(result);
    console.log('\n');
});

// 删除
connection.query('delete from  users where name="zhangsan"', {password:'ppp'}, function(err, result) {
    if (err) throw err;

    console.log('deleted zhangsan');
    console.log(result);
    console.log('\n');
});



// 查找
connection.query('select * from users', function(err, rows, fields) {
    if (err) throw err;

    console.log('selected after deleted');
    for(var i= 0,usr;usr=rows[i++];){
        console.log('user nae='+usr.name + ', password='+usr.password);
    }

    console.log('\n');

});



// 修改
connection.query('update users set password="ddd" where name="zhangsan"', {password:'ppp'}, function(err, result) {
    if (err) throw err;

    console.log('updated zhangsan\'s password to ddd');
    console.log(result);
    console.log('\n');
});


// 关闭连接
connection.end();
```


## mongoosejs

```js
//引包
var mongoose = require('mongoose');
//连接数据库，数据库叫做/studentmanagement。如果数据库不存在会自动创建。
mongoose.connect('mongodb://localhost/studentmanagement');

//创建一个schema
var studentSchema = {
    "name"     : String,
    "age"     : Number,
    "sex"     : String
};

//创建一个模型（就是一个类）
var Student = mongoose.model("student" , studentSchema);

//new一个实例
var xiaoming = new Student({
    "name"     : "小明",
    "age"     : 12,
    "sex"     : "男"
});

//持久化
xiaoming.save();


// 查找
//引包
var mongoose = require('mongoose');
//连接数据库，数据库叫做studentmanagement。如果数据库不存在会自动创建。没有大回调。
mongoose.connect('mongodb://localhost/studentmanagement');

//创建一个schema
var studentSchema = {
    "name"     : String,
    "age"     : Number,
    "sex"     : String
};

//创建一个模型
var Student = mongoose.model("student" , studentSchema);

Student.find({"age" : {$gt : 12}},function(err,docs){
    console.log(docs);
});


// 删除
Student.remove({"name" : "小明"},function(err){
    
});

// 修改
Student.find({"name" : "小强"} , function(err,docs){
    var xq = docs[0];
    xq.sex = "女";
    xq.save();
});
```