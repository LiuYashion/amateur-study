

# 流程

> beforeCreat -> created -> beforeMount -> mount
>
> beforeUpdate -> updated
>
> beforeDestroy -> destroyed

## beforeCreate | created
完成各种初始化，接着就会调用vm.$mount
```js
Vue.prototype._init = function (options) {
  // ...
  callHook(vm, 'beforeCreate')
  initState(vm) /** 初始化props data methods wathch computed */
  callHook(vm, 'created')
  // ...
}
```

## beforeMount | mounted | beforeUpdate | updated
Watcher在这里被新建，当数据变化的时候，执行回调vm._update
```js
function mountComponent (vm, el, hydrating) {

  /** 渲染vnode */
  callHook(vm, 'beforeMount')

  updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }

  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  })

  if (vm.$vnode == null) {
    vm._isMounted = true
    /**
     * new Vue时的mounted在这里执行
     * 其他的mounted在别处，在vnode已经patch到dom后，会把钩子函数再执行一遍
     */
    callHook(vm, '')
  }
  return vm
}
// 每个子组件都是在这个钩子函数中执行 mouted 钩子函数
const componentVNodeHooks = {
  // ...
  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    // ...
  },
}
// vm._watcher 的回调执行完毕后，才会执行 updated
function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated')
    }
  }
}
```

## beforeDestroy | destroyed
销毁最终会调用$destroy
```js
Vue.prototype.$destroy = function () {

  callHook(vm, 'beforeDestroy')

  vm._isBeingDestroyed = true
  // 从 parent 的 $children 中删掉自身
  const parent = vm.$parent
  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm)
  }
  // 删除 watchers
  if (vm._watcher) {
    vm._watcher.teardown()
  }
  let i = vm._watchers.length
  while (i--) {
    vm._watchers[i].teardown()
  }

  callHook(vm, 'destroyed')
}
```
