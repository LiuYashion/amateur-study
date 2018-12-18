[charls抓包原理](https://www.jianshu.com/p/405f9d76f8c4)

# charls
我们知道https能够防止中间人攻击，罢了charles是如何抓去https的呢

### 官网描述
charles作为一个中间人代理，当浏览器和服务器通信时，Charles接收服务器的证书，但动态生成一张证书发送给浏览器，也就是说Charles作为中间代理在浏览器和服务器之间通信，所以通信的数据可以被Charles拦截并解密。由于Charles更改了证书，浏览器校验不通过会给出安全警告，必须安装Charles的证书后才能进行正常访问


