### 前端性能优化（一）
这篇是 Google 出的性能优化的系列文章，大家可以花点时间全部看一遍，有问题可以在下面回复

* https://developers.google.cn/web/fundamentals/performance/why-performance-matters/

#### 了解常用性能测试工具
* 熟悉 [chrome developer tools](https://developers.google.com/web/tools/chrome-devtools/)

这个工具可能你天天都在用，但是很多功能可能你并没有用到，有时间可以系统的了解一下，性能优化很多时候都是需要这个工具帮助你找到性能瓶颈

* 了解 ySlow 及其 23 条规定 http://yslow.org/
* 熟悉 PageSpeed
* 熟悉 Lighthouse

#### HTTP 缓存相关
有兴趣可以从 rfc7234 这个标准开始，了解相关的规定，另外，就是 rfc2616 已经废弃了

* https://www.mnot.net/blog/2014/06/07/rfc2616_is_dead
* https://tools.ietf.org/html/rfc7234
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
* http://www.cnblogs.com/vajoy/p/5341664.html




#### 客户端缓存
* localStorage + sessionStorage
* App Cache (manifest)
* Service Worker

#### 练习
1、https://github.com/FE-star/exercise19
2、尝试 PWA，至少写个 demo 玩玩 https://codelabs.developers.google.com/codelabs/your-first-pwapp/


