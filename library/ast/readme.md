# AST抽象语法树
这里我们将学会如何拆解javascript语言


## 我们先拆解一个简单的demo
```js
function add(a + b) {
    return a + b
}
```
拆解一下这个函数定义的几个部分：
- add名字
- (a + b)参数
- 函数的内容

那我们拆解的内容大概如下
```js
{
    id: {
        name: 'add'
        type: 'identifier'
    },
    param: [
        {
            name: 'a'
            type: 'identifier'
            ...
        },
        {
            name: 'b'
            type: 'identifier'
            ...
        }
    ],
    body: ...
}
```

那我们再来看看body，块级作用域部分。return里面的表达式可以继续拆解，拆解成操作符和对象，按照这样的规律，我们可以把一个函数拆解成一个树。


## recast可以帮助到我们

### 拆解
这里来看看我们如何使用recast拆解一段代码，在输出结果中我们可以查看到这段代码的各种属性
```js
const recast = require("recast");
const code = `
  function add(a, b) {
    return a +
      // 有什么奇怪的东西混进来了
      b
  }
`
const ast = recast.parse(code);
console.log(ast.program.body[0])

// 输出结果
FunctionDeclaration{
    type: 'FunctionDeclaration',
    id: ...
    params: ...
    body: ...
}
```


### 改装
比如把匿名函数function add(a, b){…}，改成声明式const add = function(a ,b){…}，所以我们需要创建一个AST对象

```js
//  引入变量声明，变量符号，函数声明三种“模具”
const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders
//  将准备好的组件置入模具，并组装回原来的ast对象。
ast.program.body[0] = variableDeclaration("const", [
  variableDeclarator(add.id, functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body
  ))
]);
//  将AST对象重新转回可以阅读的代码
const output = recast.print(ast).code;
console.log(output)
```

这样，我们就创建好了const add = function(){}的AST对象

## 我们能做的还有更多
除了解释，打印，重组这些功能以外。recats还有其他的功能。

### recats.run()
我们可以命令行读取文件，并打印出转换的ast对象

### recats.visit
ast节点遍历

### recats.visit
判断ast节点类型




# 现在我们实战一下

