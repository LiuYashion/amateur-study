# 性能优化
https://developers.google.cn/web/fundamentals/performance/why-performance-matters/




# yslow(http://yslow.org/)
看看其23条特性

- 最小化http请求。合并js文件，雪碧图
- 使用CDN。尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。
- 避免空的src和href
- 为文件头制定Expires。使内容能够缓存
- 使用gzip压缩内容
- 把css放到顶部，把JS放到底部，将CSS和JS放到外部文件中
- 避免使用CSS表达式
- 配置ETags
- Expires、Cache-Control、ETag
  
### 1）Expires
告诉浏览器，某资源直到某个时间才会过期，所以在没有过期之前，浏览器就直接使用本地的缓存了
 
### 2）Cache-Control
服务器通过一个Header（Last-Modified）告诉浏览器，某资源最后修改的时间。如果在该时间后没有修改过，则返回304

### 3）ETag
用来标识某个资源的“版本”（服务器生成），客户端（浏览器）请求的时候，比较ETag如果一致，则表示该资源并没有被修改过，客户端（浏览器）可以使用自己缓存的版本，避免重复下载







http://www.cnblogs.com/vajoy/p/5341664.html


# PageSpeed
https://developers.google.com/speed/pagespeed/insights/?hl=zh-CN

这里采用了我司的业务主页进行评分。

# Lighthouse
可以直接在chrome-devtools中查看


# http缓存

### Cache-Control

可缓存性
```text
Cache-control: public
Cache-control: private
Cache-control: no-cache
Cache-control: only-if-cached
```

到期时间
```text
Cache-control: s-maxage=<seconds>
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
```


### 1）通用请求头
- Cache-Control 缓存控制行为
- Pragma

### 2）请求首部字段
- If-Match
- If-None-Match

### 3）响应首部
- ETag 资源的匹配信息

### 4）实体首部字段
- Expires
- Last-Modified 最后一次修改的时间


# 客户端缓存
