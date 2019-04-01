# new Vue

Vue初始化主要就干了几件事情:
- 合并配置，
- 初始化生命周期，
- 初始化事件中心，
- 初始化渲染，
- 初始化 data、props、computed、watcher 等等

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++
  ...
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```
Vue 的初始化逻辑写的非常清楚，把不同的功能逻辑拆成一些单独的函数执行，让主线逻辑一目了然，这样的编程思想是非常值得借鉴和学习的。

由于我们这一章的目标是弄清楚模板和数据如何渲染成最终的 DOM，所以各种初始化逻辑我们先不看。在初始化的最后，检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM，那么接下来我们来分析 Vue 的挂载过程。



# Vue实例挂载
$mount有很多种，根据平台和构建方式都有关，我们先抛开构建工具，这里是调用了mountComponent方法
```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```



```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el

  callHook(vm, 'beforeMount')

  let updateComponent
  // 定义好updateComponent方法
  if (process.env.NODE_ENV !== 'production') {
    updateComponent = () => {
      mark(startTag)
      const vnode = vm._render() // 虚拟Node
      ...
      vm._update(vnode, hydrating)  // 更新DOM
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating) // 更新DOM
    }
  }

  // 新建一个watcher，并传入回调函数
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // 初始化的时候调用回调函数
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}

```
Watcher 在这里起到两个作用：

- 一个是初始化的时候会执行回调函数
- 另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数，这块儿我们会在之后的章节中介绍

函数最后判断为根节点的时候设置 vm._isMounted 为 true， 表示这个实例已经挂载了，同时执行 mounted 钩子函数。 这里注意 vm.$vnode 表示 Vue 实例的父虚拟 Node，所以它为 Null 则表示当前是根 Vue 的实例

mountComponent 方法的逻辑也是非常清晰的，它会完成整个渲染工作，接下来我们要重点分析其中的细节，也就是最核心的 2 个方法：vm._render 和 vm._update


# vm._render

```js
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options

  vm.$vnode = _parentVnode
  // render self
  let vnode
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } catch (e) {

  }
  vnode.parent = _parentVnode
  return vnode
}
```

我们在平时的开发工作中手写 render 方法的场景比较少，而写的比较多的是 template 模板，在之前的 mounted 方法的实现中，会把 template 编译成 render 方法，但这个编译过程是非常复杂的，我们不打算在这里展开讲，之后会专门花一个章节来分析 Vue 的编译过程

### 编译
这里简单讲讲，大概就是下面这么编译的~
```html
<div id="app">
  {{ message }}
</div>
```

```js
render: function (createElement) {
  return createElement('div', {
    attrs: {
      id: 'app'
    },
  }, this.message)
}
```

总的来说，vm._render 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node。Vue 2.0 相比 Vue 1.0 最大的升级就是利用了 Virtual DOM。因此在分析 createElement 的实现前，我们先了解一下 Virtual DOM 的概念



# Virtual DOM
真的dom的代价是很高的，一个creatElement出来的div就有很多属性，所以我们自定义一个vnode来描述节点
```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node
  ...
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    ...
  }

  get child (): Component | void {
    return this.componentInstance
  }
}
```

其实 VNode 是对真实 DOM 的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其它属性都是都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历
- VNode 的 create、diff、patch 等过程。

那么在 Vue.js 中，VNode 的 create 是通过之前提到的 createElement 方法创建的，我们接下来分析这部分的实现


# createElement
createElement是对_createElement的一层封装，允许你传入的参数更加灵活
```js
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  ...
  return _createElement(context, tag, data, children, normalizationType)
}
```

来看看这个方法
```js
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  // children的规范化
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  // vnode的创建
  let vnode = createComponent(tag, data, context, children)
  return vnode
}
```

# normalizeChildren
children的规范化，dom是一个树状结构，_createElement第4个参数是任意节点，所以我们需要对这个节点进行规范化，这里会根据normalizationType来调用不同方法

- simpleNormalizeChildren

  这是当children已经是vnode的时候调用的，但是当函数式组件返回数组的时候，就要用到它来展平

- normalizeChildren

  - 当用户手写render的时候
  - 当slot，v-for会有嵌套数组的时候

  这里就是遍历children节点，获得单个节点n，然后对n进行判断，如果还是数组就调用normalizeArrayChildren，否则就调用createTextVNode转成Vnode

综述，我们这么做就是为了把children变为Vnode的array


# VNode 的创建
来看节点的创建

```js
let vnode, ns
if (typeof tag === 'string') {
  let Ctor
  ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
  if (config.isReservedTag(tag)) {
    // platform built-in elements
    vnode = new VNode(
      config.parsePlatformTagName(tag), data, children,
      undefined, undefined, context
    )
  } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
    // component
    vnode = createComponent(Ctor, data, context, children, tag)
  } else {
    // unknown or unlisted namespaced elements
    // check at runtime because it may get assigned a namespace when its
    // parent normalizes children
    vnode = new VNode(
      tag, data, children,
      undefined, undefined, context
    )
  }
} else {
  // direct component options / constructor
  vnode = createComponent(tag, data, context, children)
}
```

这里先对 tag 做判断，如果是 string 类型，则接着判断如果是内置的一些节点，则直接创建一个普通 VNode，如果是为已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode，否则创建一个未知的标签的 VNode。 如果是 tag 一个 Component 类型，则直接调用 createComponent 创建一个组件类型的 VNode 节点。对于 createComponent 创建组件类型的 VNode 的过程，我们之后会去介绍，本质上它还是返回了一个 VNode


到这里，我们发现最终都是通过createComponent来创建vnode的，回到最开始，此时我们通过vm._render创建好了vnode，


# vm._update

这个方法是将vnode渲染成真正的dom，它有两次被调用的机会：
- 首次渲染
- 数据更新时渲染

这里先针对首次渲染分析

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const prevActiveInstance = activeInstance
  activeInstance = vm
  vm._vnode = vnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  activeInstance = prevActiveInstance
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
}
```

可以发现，主要就是调用vm.\_\_patch\_\_，这个方法会受到平台和渲染方式的影响，我们选择一种来查看

```js
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export function createPatchFunction (backend) {
  const { modules, nodeOps } = backend
  ...
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    ...
    return vnode.elm
  }
}
```

createPatchFunction中定义了一个patch方法，并最终返回了它，可以看看这里用到的backend，闭包传入哦~

