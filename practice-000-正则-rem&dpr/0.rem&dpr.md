

> 用以介绍rem，css像素，设备像素的概念和使用


### 设备像素 | css像素

设备像素：屏幕的物理像素

CSS像素：抽象概念

**当我给div设置width:200px的时候发生了什么？**

    这里的200px实际上是css像素，但是在设备上到底跨越了多少像素，我们需要根据下面两点来判断：
    1. 手机屏幕特性，dpr像素比
    2. 用户viewport的缩放

如果是苹果屏幕，它密度很高。他的像素密度是普通屏幕的两倍，所以200px（200个css像素）在屏幕上跨越了400个设备像素。正常情况下，如果用户缩小了页面，200个css像素就占不了200个设备像素


### 布局视口，视觉视口，理想视口

    布局视口：PC浏览器视口只有一个，视口的宽高就是浏览器窗口的宽高。因为移动端手机很窄，所以布局视口会比手机屏幕大的多。他是CSS布局的依据视口

    视觉视口：用户所能看到网站的区域

    理想视口：就是最理想的视口（满屏），下面的代码是告诉浏览器，把布局视口设置为理想视口。这是我们最应该关注的

看看这段代码：
```html
<meta name="viewport" content="width=device-width" />

<!-- 布局视口等于理想视口，且页面不允许缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```


### 设备像素比 dpr
设备像素个数 / 理想视口css像素个数，比如：使用3个设备像素来渲染1px
```js
window.devicePixelRatio // iphone6:2 | galaxy s5:3 | iphoneX:3
```


### 缩放
当我们缩放的时候，其实控制的是css像素，就是css渲染时对应的1px，1px用几个设备像素渲染


### 媒体查询
回忆一下媒体查询写法
```css
@media all and (min-width: 321px) and (max-width: 400px){
  .box{
    background: red;
  }
}
```


### 谈谈设计稿

    1080 × 1920
      这是给iOS Android的设计稿尺寸，不是给前端开发的尺寸

    750 × ~
      这个是给前端的，iphone的二倍图


**所以移动端跟pc端的psd文件尺寸肯定是不同的**

假如现在设计师给了我们一张750宽度的的iphone6稿件：
- 首先，我们在设计稿上量了一个div宽度为200px
- 接着，在css里面我们就要写100px（iphone6一个css像素，占了两个物理像素）

**然而，当我们遇到了不同dpr的手机呢？所以需要换一个方法了**



#### No.1 我们先缩放屏幕，保证一个css像素等于一个物理像素

通过meta标签来，达到缩放的目的
```js
var scale = 1 / window.devicePixelRatio;
var value = `
  width=device-width,
  initial-scale=${scale},
  maximum-scale=${scale},
  minimum-scale=${scale},
  user-scalable=no
`
document.querySelector('meta[name="viewport"]').setAttribute('content', value);
```

但是这么设置之后，我们发现，div宽度一直是200px，经过上面设置之后，我们能保证这个div占了200个物理设备像素。但是这真的是我们想要的么，因为这样元素就不成比例了，会严重影响到布局，因为我们的目的是最大程度的还原设计稿，所以我们要考虑到屏幕，也要考虑到比例。


#### No.2 然后把px换成rem试试
rem是相对尺寸单位，相对于html字体大小的单位，那我们计算一下
```js
document.documentElement.style.fontSize = `${document.documentElement.clientWidth/10}px`;
```

这么设置之后，html的font-size就是750/10 = 75px了，上面的200px就等于200/75=2.6666rem，这样就可以根据手机的尺寸不同而等比的缩放了，就是测量起来麻烦点，需要手动除以75



### 再换个方式想想？
假如我们正常使用1：1的meta标签，750px的设计稿，我们设置html的font-size是100px，所以屏幕宽度是7.5rem
```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
```

**这样不论在什么设备下面，页面宽度始终是7.5rem**，所以我们量得的长度直接除以100就是rem单位了，这样也是实现了等比缩放。但是设计到字体大小的时候，不要使用rem，而是使用媒体查询来设置px

```css
@media screen and (max-width: 321px) {
  header,footer {
    font-size:16px
  }
}
@media screen and (min-width: 321px) and (max-width:400px) {
  header,footer {
    font-size:17px
  }
}
@media screen and (min-width: 400px) {
  header,footer {
    font-size:19px
  }
}
```
**以上就是我们最常用的方法**
