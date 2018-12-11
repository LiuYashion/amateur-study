[https学习](https://github.com/youngwind/blog/issues/108)

# 网络协议
https://www.zhihu.com/question/51074319

https://zhuanlan.zhihu.com/p/33701330

https://www.zhihu.com/question/19916403/answer/270985912



# DNS（Domain Name System）解析
https://www.zhihu.com/question/23042131

DNS是应用层协议，事实上他是为其他应用层协议工作的，包括不限于HTTP和SMTP以及FTP，用于将用户提供的主机名解析为ip地址。

# 互联网流量劫持
流量劫持最直观的表现，就是网页上被插入了一些乱七八糟的广告/弹窗之类的内容或者网址被无辜跳转，多了推广尾巴。

### 释义
流量劫持本质上攻击者在通信两端之间对通信内容进行嗅探和篡改，以达到插入数据和获取关键信息的目的。

### 实现
- 域名劫持
  
  通过劫持掉域名的DNS解析结果，将HTTP请求劫持到特定IP上，使得客户端和攻击者的服务器建立TCP连接，而非和目标服务器直接连接，这样攻击者就可以对内容进行窃取或篡改。在极端的情况下甚至攻击者可能伪造目标网站页面进行钓鱼攻击。一般而言，用户上网的DNS服务器都是运营商分配的，所以，在这个节点上，运营商可以为所欲为。
  
  例如，访问http://jiankang.qq.com/index.html，正常DNS应该返回腾讯的ip，而DNS劫持后，会返回一个运营商的中间服务器ip。访问该服务器会一致性的返回302，让用户浏览器跳转到预处理好的带广告的网页，在该网页中再通过iframe打开用户原来访问的地址。
