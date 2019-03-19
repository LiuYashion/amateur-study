## 设备像素 | css像素
设备像素：屏幕的物理像素
CSS像素：抽象概念

> 当我给div设置width:200px的时候发生

这里的200px实际上是css像素，但是在设备上到底跨越了多少像素，我们需要根据下面两点来判断：
- 手机屏幕特性
- 用户的缩放

如果是苹果屏幕，它密度很高。他的像素密度是普通屏幕的两倍，所以200px(200个css像素)在屏幕上跨越了400个设备像素。正常情况下，如果用户缩放页面，200个css像素就跨越不了200个设备像素。


## 布局视口，视觉视口，理想视口
- PC浏览器

  视口只有一个，视口的宽高就是浏览器窗口的宽高。


## devicePixelRatio 设备像素比
可以理解为：1个css像素相对于1个物理像素的比值
```js
window.devicePixelRatio // 1 || 2 || 3
```

http://hcysun.me/2015/10/16/%E4%B8%80%E7%AF%87%E7%9C%9F%E6%AD%A3%E6%95%99%E4%BC%9A%E4%BD%A0%E5%BC%80%E5%8F%91%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%96%87%E7%AB%A0%28%E4%B8%80%29/

## 设置html-font-size

```js
let fn = () => {
  let width = window.innerWidth > 640 ? 640 : window.innerWidth
  let size = (100 * (width / 1080)).toFixed(2)
  console.log(size)
  document.getElementsByTagName('html')[0].style.fontSize = size + 'px'
}
fn()
window.onresize = fn
```
