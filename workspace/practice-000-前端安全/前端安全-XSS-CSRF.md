
# 前端安全


# XSS
跨站脚本攻击。攻击者注入恶意代码，盗窃用户信息。

**1.1 反射型**

直接返回了用户输入的内容，直接将url后面的参数，显示在浏览器上。攻击者就可以写入恶意代码，然后被执行

解决方式：
```
对用户输入的信息进行过滤，判断，禁止输入非法信息
```


**1.2 存储型**

将恶意代码保存到了数据库中（比如保存文章，或评论），访问到的用户都会被攻击

解决方式：
```
输出到HTML页面的变量，都需要转义
```


**1.3 DOM类型**

这就是纯粹的客户端攻击，在浏览器里面写js

解决方式：

设置：网络安全策略
```
服务端设置：
Content-Security-Policy: default-src 'none'; base-uri 'self'; block-all-mixed-content; connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com

客户端设置：
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;script-src * 'unsafe-inline'">
```

### 综上

- CSP

  上面设置Content-Security-Policy，其实就是CSP。是一种内容安全策略，用来检测并削弱一些特定类型的攻击，包含的就有XSS，和数据注入

- httpOnly

  防止cookie被盗取

- 用户输入的任何东西都要检查
- 服务端输出也要检查



# CSRF
跨站伪造请求。在用户登录网站A后，打开网站B，发出A网站的请求，从而操作用户在网站A的权限动作。

解决方式：
- 验证码

  最简洁有效的方式

- Referer Check

  我们可以判断请求是从哪里发起的，从而判断是不是csrf攻击（这样可以防止图片盗链）

- token验证

  可以在http请求头中加入authorization（token）验证，来预防csrf攻击


