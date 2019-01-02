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

### 3.1）lazyload
懒加载在长网页中延迟加载图像，原理：首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中，
当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载
```html
<img src="" class="image-item" lazyload="true"  data-original="images/1.png"/>
```