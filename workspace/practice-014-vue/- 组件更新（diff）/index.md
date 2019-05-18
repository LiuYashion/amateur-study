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


## diff（所有的指针只针对位置，不针对元素）
组件更新的过程，就是（新vnode 和 旧dom）的过程，比较只会选择同一层级的dom做比较

经过阅读源码，我们看看比较的逻辑顺序：

  1. (oS, s)相同就都++
  2. (oE, e)相同就都--
  3. (oS, e)相同就oS会移动到最后，oS++ e--
  4. (oE, s)相同就oE会移动到最前，oE-- s++

如果都没有匹配上：

#### 当有key的时候

根据oldChild的key生成一张hash表，用s的key与之比较，s和oS比较，相同就把oS指向的移到最前面


```js
oldVnode (old dom) {
  [ A, B, D ]
    ↑     ↑
    oS    oE
}
Vnode (new vnode) {
  [ A, C, D, B ]
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

> oldChildren 先遍历完，说明有新的vnode需要插入
> vnode 先遍历完，说明有旧dom需要删除

### demo1
```js
/** 新增了节点的 */
[ -A, B, C, -D ]
[ -D, C, B, A, -E ]
// oE，s匹配。oE移到首位，oE--，s++

[ D, -A, B, -C ]
[ D, -C, B, A, -E ]
// oE，s匹配。oE移到首位，oE--，s++

[ D, C, -A, -B ]
[ D, C, -B, A, -E ]
// oE，s匹配。oE移到首位，oE--，s++

[ D, C, B, --A ]
[ D, C, B, -A, -E ]
// 此时oS === s，oS++，s++。然后oldChildren先遍历完

[ D, C, B, -A (-)]
[ D, C, B, A, --E ]
// oE < oS，将[s, e]区间插入即可
```


### demo2
```js
/** 删除了节点的 */
[ +A, C, E, B, -D ]
[ +C, B, -A ]

[ +C, E, B, -D, A ]
[ +C, -B, A ]

[ C, +E, B, -D, A ]
[ C, +-B, A ]
// 都没匹配上，生成hash表。用oS和s判断，于是找到了b

[ C, B, +E, -D, A ]
[ C, -B, +A ]
// // chilren先比较完，删掉[E, D]

[ C, B, A ]
[ C, B, A ]
```



### demo3
```js
/** 全部是新的 */
[ +A, B, C, -D ]
[ +E, F, G, -H ]

[ E, +A, B, C, -D ]
[ E, +F, G, -H ]

...
[ E, F, G, H ,+A, B, C, -D ]
[ E, F, G, +-H ]
// children先比较完 删掉[A, B, C, D]

[ E, F, G, H ]
[ E, F, G, H ]
```


### demo4
```js
/** 新增了，也删除了 */
[+A, B, C, D, -E]
[+D, C, B, F, -G]
// 都没匹配上，生成hash，s与[oS, .. oE]比较

[D, +A, B, C, -E]
[D, +C, B, F, -G]

[D, C, +A, B, C, -E]
[D, C, +B, F, -G]

[D, C, B, +A, C, -E]
[D, C, B, +F, -G]

[D, C, B, F, +A, C, -E]
[D, C, B, F, +-G]

[D, C, B, F, G, +A, C, -E]
[D, C, B, F, -G (+)]
// children先比较完，所以删除[A,C,E]
```
