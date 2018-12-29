
[https://juejin.im/post/5abf33f16fb9a028e46ec352](https://juejin.im/post/5abf33f16fb9a028e46ec352)

# tapable
webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。本文主要介绍一下Tapable中的钩子函数。


### hooks预览
钩子分为几种，同步异步。然后再分为并发和串行。接下来我们一个个枚举钩子的类型。实例代码可以参考index.js

### plugin编写
webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问