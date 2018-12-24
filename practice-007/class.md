# 性能优化

[视频链接 http://www.zhenchuanx.com/course/70/task/335/show](http://www.zhenchuanx.com/course/70/task/335/show)

# Tips

### http缓存
与缓存相关的在response-header里：expires、last-modified、cache-control(本地时间跟服务器时间可能不同)、e-tag、


- e-tag

  文件的hash值，代表文件是否被修改过

- max-age

- last-modified

  请求过后会有一个这个属性，如果发现value

那我们来设计一个资源的缓存方案：
  
html：no-cache，css/js：md5/timestamp/version + 长缓存，image：随机名字+长缓存


### localStorage
浏览器给每个域名分配了5m的内容，a.meituan.com/b.meituan.com不是一个域，如果存超了，会存不进去然后js报错。可以考虑降级存在sessionStorage中，这里就会遇到问题：sessioStorage是一次会话中共享，如果是新建的webview那就访问不到了；再考虑降级到cookie，这样就可能因为过大被413拦截；单页面应用共享就很简单。当然最好的就是规避问题，划分好域名，考虑单页面应用，最后不行只能请你掉别人的，给自己localstorage的key加一个前缀。

# hybrid
service worker出来，所以离线缓存得到了实现，rn / weex，
https://yq.aliyun.com/articles/2939


# 请求包优化
代码压缩，html，css，js。几种图片格式的使用

baseline-jpeg（图片是一行一行渲染的），progressive-jpeg（图片是先模糊再精细）。总结，什么情况下使用什么图片：高保真png，一般jpg比png小

reques-header会带accept头，代表能接受什么类型的图片。避免重定向。用pageSpeed和lightHouse

for 比 forEach性能要好


benchmark

map set