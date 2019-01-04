# 性能测试2

### 1）代码效率
可以针对代码执行效率进行测试
- https://benchmarkjs.com
- https://github.com/jsperf/jsperf.com


### 2）JIT
是浏览器对js代码的一种处理方式，通过监视代码的运行状态，把 hot 代码（重复执行多次的代码）进行优化。通过这种方式，可以使 JavaScript 应用的性能提升很多倍。

为了使执行速度变快，JIT 会增加很多多余的开销，这些开销包括：

- 优化和去优化开销
- 监视器记录信息对内存的开销
- 发生去优化情况时恢复信息的记录对内存的开销
- 对基线版本和优化后版本记录的内存开销

这里还有很大的提升空间：即消除开销。通过消除开销使得性能上有进一步地提升，这也是 WebAssembly 所要做的事之一。

https://zhuanlan.zhihu.com/qianduandaha



### 3）lazy
- throttle / debounce
  
  防抖：操作结束n秒后才执行，如果重复动作，计时会刷新。
  
  节流：同一个周期内，只会执行一次操作，重复操作则会被忽略掉。

- setTimeout / requestAnimationFrame

  requestAnimationFrame是H5新增的定时器，setTimeout和setInterval的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果

- lazyload / preload

  见下面

### 3.1）lazyload懒加载
懒加载在长网页中延迟加载图像，原理：首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中，
当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载
```html
<img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
```
```js
rect = item.getBoundingClientRect() 
//  用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
if ( rect.bottom>=0 && rect.top < viewHeight ) {
  var img = new Image()
  img.src = item.dataset.original
  img.onload = function(){
    item.src = img.src
  }
  item.removeAttribute（"data-original"）
  //  移除属性，下次不再遍历
  item.removeAttribute（"lazyload"）
}
```



### 3.2）preload预加载
原理就是讲所有资源预先下载，后面需要时直接使用缓存即可。在网页全部加载之前，对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。否则，如果一个页面的内容过于庞大，没有使用预加载技术的页面就会长时间的展现为一片空白，直到所有内容加载完毕。这里是几种方法：

- html标签
  ```html
  <img src="http://pic26.nipic.com/20121213/61681830044449030002.jpg" style="display:none"/>
  ```

- image对象
  ```js
  var image = new Image()
  image.src = "http://pic26.nipic.com/20121213/61681830044449030002.jpg"
  ```

- XMLHttpRequest对象
  
  ```js
  var xmlhttprequest = new XMLHttpRequest();
  xmlhttprequest.onreadystatechange = callback;
  xmlhttprequest.onprogress = progressCallback;
  xmlhttprequest.open("GET", "http://image.baidu.com/mouse,jpg", true);
  xmlhttprequest.send();
  function callback(){
    if ( xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200 ) {
      var responseText = xmlhttprequest.responseText;
    } else {
      console.log("Request was unsuccessful:" + xmlhttprequest.status);
    }
  }
  function progressCallback(e){
    e = e || event;
    if(e.lengthComputable){
      console.log("Received" + e.loaded + "of" + e.total + "bytes")
    }
  }
  ```

- PreloadJS库
  
  ```js
  var queue = new createjs.LoadQueue();
  //  默认是xhr对象，如果是new createjs.LoadQueue(false)是指使用HTML标签，可以跨域
  queue.on("complete", handleComplete, this);
  queue.loadManifest([{
    id: "myImage", 
    src: "http://pic26.nipic.com/20121213/61681830044449030002.jpg"
  }, {
    id: "myImage2", 
    src: "http://pic9.nipic.com/20100814/28395261931471581702.jpg"
  }]);
  function handleComplete () {
    var image = queue.getResuLt("myImage");
    document.body.appendChild(image);
  }

  ```

### 3.3）懒加载与预加载对比
两者都是提高页面性能有效的办法，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力


### 3.4）更对的优化
https://juejin.im/post/5b022bdf518825426d2d69fe


### 4）大列表合并
数据长度大于1000，且不能分页展示的列表。我们叫做大列表。

https://zhuanlan.zhihu.com/p/26022258