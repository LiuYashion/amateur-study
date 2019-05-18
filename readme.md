
1. calc（） 函数用于动态计算长度值
    ```css
    width: calc(100% - 10px)
    ```

2. 为什么vue的data必须是一个函数
    
    因为 每个实例 可以维护一份 被返回对象的 独立的 拷贝，不然多个组件共享状态得话，操作一个，另一个也会改变

3. compiler和runtime有什么区别

    vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时）。
    - runtime（不带编译的），通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。在将 .vue 文件编译成 JavaScript的编译过程中会将组件中的template模板编译为render函数，所以我们得到的是render函数的版本。所以运行的时候是不带编译的，编译是在离线的时候做的。
    - compiler（编译过得），我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板

4. fetch 上传/下载文件
   
   ```js
    /** 上传文件 */
    let file = e.target.files[0];
    const formdata = new FormData();
    formdata.append('file', file);

    const url = 'http://127.0.0.1:8080/file/upload';
    fetch(url, {
        method: 'POST',
        body: formdata,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => return response.json();)
      .catch(error => console.log(error));
   ```

   ```js
    /** 下载文件 */
    const downloadUrl = 'http://127.0.0.1:8080/file/download';
    fetch(downloadUrl, {
        method: 'POST',
        body: window.JSON.stringify(params),
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => {
        response.blob().then( blob => {
            let blobUrl = window.URL.createObjectURL(blob);
            //不能直接创建一个<a>标签
            // let a = document.createElement('a_id');
            let a = document.getElementById('a_id');
            //无法从返回的文件流中获取文件名
            // let filename = response.headers.get('Content-Disposition');
            let filename = 'file.txt';
            a.href = blobUrl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(blobUrl);
        });
    }).catch((error) => {
        console.log(error);
    });
   ```

5. fetch参数的意思

    mode 请求模式
    - cors
        
        采用跨域请求（允许跨域），要求服务器cors。有限的一些headers被暴露给Response对象，但是body是可读的
        ```js
        res.header('Access-Control-Allow-Origin', '*');
        ```
    - no-cors

        表示不使用跨域请求（一般用于请求CDN的脚本、其他域的图片和其他一些跨域资源），不要求服务器支持cors。如果服务器不支持：传cors会报错；传no-cors不会报错，但是我们拿不到请求数据；

    - same-origin

        如果请求跨域（直接禁止跨域），就会error

    credentials 是否携带cookie
    - omit（默认）
    - same-origin（同域携带）
    - include（携带）

    cache 缓存模式
    - default（请求前会检查缓存）
    - no-store（忽略http缓存）
    - reload（请求后会更新缓存）
    - no-cache（如果存在缓存, 那么fetch将发送一个条件查询request和一个正常的request, 拿到响应后, 它会更新http缓存）
    - force-cache（强制依赖缓存）


6. proxy-table 跨域