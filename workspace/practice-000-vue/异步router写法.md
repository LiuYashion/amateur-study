
# 代码分割
```js
// 业务主页
{ 
  path: '/home',
  component: r => require.ensure([], () => r(require('./page/home')), 'home')
}
```

require.ensure 是 commonjs规范，webpack实现了它。

第一个参数是依赖模块，第二个是回调函数，第三个是chunkName。
> 这里需要注意的是，['./moudule.js']，这样写，回调中只能保证module.js可用，如果需要使用module.js，需要require('./module.js')


# vue-router写法
```js
new Router({
  mode: 'hash,
  routes: [{ 
    path: '/home',// 业务主页
    component: r => require.ensure([], () => r(require('./page/home')), 'XXXXXXXXXX')
  },{ 
    path: '/createCount', // 开户
    component: r => require.ensure([], () => r(require('./page/createCount')), 'XXXXXXXXXX')
  },],
  // 配置全局router-link的激活类名
  linkActiveClass: 'acitve',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
```