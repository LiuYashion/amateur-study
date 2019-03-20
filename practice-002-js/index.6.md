## 跨域

### 1) JSONP
js文件不会被限制

```js
window.xxx = function (value) {
  console.log(value)
}

var script = document.createElement('script')
// 我们只需要规约好函数名xxx，返回时会自动调用xxx(...args)
script.src = 'http://x.stuq.com:7001/json?callback=xxx'
document.body.appendChild(script)

// 这是被处理返回的js数据
typeof xxx === 'function' && xxx({"msg":"hello world"});
```


### 2)
Credentials

```js
xhr.withCredentials = true
```

### 3)
hash。Iframe，在iframe中改变parent.location.href，主页监听hash，当hash改变获取value

```js
/** 在y.stuq.com中加入x.stuq.com的iframe */
var iframe = document.createElement('iframe')
iframe.src = 'http://x.stuq.com:7001/public/hash.html'
document.body.appendChild(iframe)

window.onhashchange = function () {
  //....
}

/** x.stuq.com的内容 */
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var res = JSON.parse(xhr.responseText)
        parent.location.href = `http://y.stuq.com:7001/public/3.html#msg=${res.msg}`
    }
}
xhr.open('GET', 'http://x.stuq.com:7001/json', true)
xhr.send(null)
```

### 4)
通过设置 window.name
```js
// 第二次刷洗年的时候，读取子iframe的name属性
var iframe = document.createElement('iframe')
iframe.src = 'http://x.stuq.com:7001/public/name.html'
document.body.appendChild(iframe)

var times = 0
iframe.onload = function () {
    if (++times === 1) {
        console.log(JSON.parse(iframe.contentWindow.name))
    }
}

/** x.stuq.com的内容，设置window.name */
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        window.name = xhr.responseText
        location.href = 'http://y.stuq.com:7001/public/index.html'
    }
}
xhr.open('GET', 'http://x.stuq.com:7001/json', true)
xhr.send(null)
```

### 5)
postMessage。这是两个客户端之间的通信
```js

```