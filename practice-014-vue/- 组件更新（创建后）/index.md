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

来看看_update方法，其实最后也是调用vm.__patch__方法（我们之前已经分析过了）
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

我们再来看patch方法，如果是相同的调用patchVnode（见下面）
```js
return function patch (oldVnode, vnode, hydrating, removeOnly) {

  /** 判断新旧node是否相同 */
  if (sameVnode(oldVnode, vnode)) {
    // （如果新旧节点相同）
    patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
  } else {
    // （如果新旧节点不同）
    const oldElm = oldVnode.elm
    const parentElm = nodeOps.parentNode(oldElm)
    // 创建新节点
    createElm(
      vnode,
      insertedVnodeQueue,
      oldElm._leaveCb ? null : parentElm,
      nodeOps.nextSibling(oldElm)
    )

    // 找到当前 vnode 的父的占位符节点
    // 然后更新节点
    if (isDef(vnode.parent)) {
      let ancestor = vnode.parent
      const patchable = isPatchable(vnode)
      while (ancestor) {
        // 先执行各个 module 的 destroy 的钩子函数
        for (let i = 0; i < cbs.destroy.length; ++i) {
          cbs.destroy[i](ancestor)
        }
        ancestor.elm = vnode.elm
        // 如果当前占位符是一个可挂载的节点
        if (patchable) {
          for (let i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](emptyNode, ancestor)
          }
        }
        ancestor = ancestor.parent
      }
    }

    // 把 oldVnode 从当前 DOM 树中删除，
    // 逻辑就是遍历待删除的 vnodes 做删除
    if (isDef(parentElm)) {
      removeVnodes(parentElm, [oldVnode], 0, 0)
    } else if (isDef(oldVnode.tag)) {
      invokeDestroyHook(oldVnode)
    }
  }

  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
  return vnode.elm
}
```


看看patchVnode（当新旧节点相同的时候），其实就是把新的node patch到旧的vnode上，


