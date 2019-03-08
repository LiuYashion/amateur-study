# SEO优化
单页面应用固然好，但是首屏加载慢，白屏和SEO问题也日益突出，下面给出一些解决方案

# SSR

## SSR是什么？
SSR就是指服务端渲染，通过设置SSR你就可以在后台的Node环境中完成渲染，直接返回HTML视图，这样既可以使用vue，也可以直接给出页面内容。这样就方便了搜索引擎获取页面，解决SEO问题

## SSR的缺点
后端出页面，前端负责重构。这样前后端还是紧密联系起来，带来了很多不便。而且需要使用到Node层的服务，增加了开发测试成本，那么此时我们就会考虑到，有没有调和的方案呢？

# 预渲染（prerender-spa-plugin）
prerender-spa-plugin使用Puppeteer去爬取页面，它由chrome出品，用于在无UI的情况下调用chrome功能，将运行时的html文件打包起来。它是在webpack构建的最后，启动一个本地的Chromium服务，用于爬去需要预渲染的路由，然后把路由对应的html文件输出，每个路由对应一个文件夹，访问的html文件存放其中。本质就是，webpack构建，Puppeteer无UI预渲染，接着捕捉html，输出。

> 这种方式路由必须使用history模式

```js
// 使用PrerenderSPAPlugin
new PrerenderSPAPlugin({
  staticDir: path.join(__dirname, 'dist'),
  // 这是需要处理的路由
  routes: [ '/', '/about', '/contact' ],
  // 注入的参数，用于控制预渲染的内容
  renderer: new Renderer({
    inject: {
      foo: 'bar'
    },
    headless: false,
    renderAfterDocumentEvent: 'render-event'
  })
})
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})
```
上面打包出来的dist目录如下
```
-dist
  ├─index.html
  ├─about
  │   └─index.html
  └─contact
      └─index.html
```
这样我们就保证了html文件的参数，SEO在这方面的问题也解决了。页面的内容已经存在于html了，也就不会有js加载慢导致的白屏。

## 这样就没问题了吗？
- 对于动态数据类型的页面，无法处理
- 路由过多时，构建时间较长

## 总结一下
以上所说的，目的都是更好地用户体验，如果预渲染的静态页面和最终呈现的页面切换不自然，那么体验是很差的。这里有两种方法：

- Loading
- 骨架屏

https://github.com/ElemeFE/page-skeleton-webpack-plugin/blob/master/docs/i18n/zh_cn.md

# 服务器端渲染（vue-server-renderer）



