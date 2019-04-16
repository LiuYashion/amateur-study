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
  [ A, B, D ]
    ↑     ↑
    oS    oE
}
Vnode (new vnode) {
  [ A, C, D, B]
    ↑        ↑
    s        e
}
```

这里有4个节点（oS oE s e）互相比较
> 当其中有两个能匹配上，那么真实dom节点会移动到vnode的位置

1. (oS，s)匹配上了，oS就在第一个就不管了。oS++，s++；
```js
[ A, B, D ]
  ↑     ↑
  oS    oE

[ A, C, D, B]
  ↑        ↑
  s        e
```

2. (oS，e)匹配上了，就把oS移到最后的位置。oS++，e--；
```js
[ A, B, D ]
     ↑  ↑
     oS oE

[ A, C, D, B]
     ↑     ↑
     s     e
```

3. (oE，e)匹配上了，位置不变，都是倒数第二，oE--，e--；
```js
[ A, D, B]
     ↑
     oS,oE

[ A, C, D, B]
     ↑  ↑
     s  e
```

oS和oE先重叠，oldChildren先遍历完。将对于的vnode插进去即可。如果是children先遍历完，将真实dom中，区间为[oS, oE]的删掉即可


### 换个demo
```js
[ -A, B, C, -D ]
[ -D, C, B, A, -E ]

// oE，s相同
[ D, -A, B, -C ]
[ D, -C, B, A, -E ]

[ A, B, C, D ]
[ D, C, B, A, E ]

[ A, B, C, D ]
[ D, C, B, A, E ]

[ A, B, C, D ]
[ D, C, B, A, E ]
```
