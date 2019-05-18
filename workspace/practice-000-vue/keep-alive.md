# keep-alive 缓存组件
spa中用来缓存页面的

```html
<keep-alive>
	<router-view />
</keep-alive>
```

只缓存某些router
```html
<keep-alive :include="['ListView', 'DetailView']">
  <router-view />
</keep-alive>
```

