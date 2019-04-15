# 组件更新

我们知道了vue的 依赖收集，派发更新，以及nextTick优化。那么更新派发之后，组件是如何更新的呢？

我们来回顾下代码：

数据变化后，会触发watcher的回调函数，从而执行组件更新
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
new Watcher(vm, updateComponent, noop, {
  before () {
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}, true /* isRenderWatcher */)
```

来看看_update方法，其实最后也是调用vm.__patch__方法（我们之前已经分析过了），然后更新dom
```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  // ...
  const prevVnode = vm._vnode
  if (!prevVnode) {
     // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  // ...
}
```


## diff
组件更新的过程，就是（新vnode 和 旧dom）的过程，比较只会选择同一层级的dom做比较

```js
oldVnode (old dom) {
  [ A, B, C, D ]
    ↑        ↑
  oStart   oEnd
}
Vnode (new vnode) {
  [ D, C, B, A, E ]
    ↑           ↑
  start        end
}
```

- （oStart，end）匹配上了，oldS会移到最后
- （oEnd，start）匹配上了，oEnd会移到最前
- （oEnd，end）匹配上了，oEnd会移到最前
- （oStart，start）匹配上了，oEnd会移到最前
