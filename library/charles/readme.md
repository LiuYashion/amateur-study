[https学习](https://github.com/youngwind/blog/issues/108)

# 网络协议
https://www.zhihu.com/question/51074319
https://zhuanlan.zhihu.com/p/33701330
https://www.zhihu.com/question/19916403/answer/270985912


# DNS（Domain Name System）解析
https://www.zhihu.com/question/23042131

DNS是应用层协议，事实上他是为其他应用层协议工作的，包括不限于HTTP和SMTP以及FTP，用于将用户提供的主机名解析为ip地址。






# A)互联网流量劫持
流量劫持最直观的表现，就是网页上被插入了一些乱七八糟的广告/弹窗之类的内容或者网址被无辜跳转，多了推广尾巴。
### 1)定义
流量劫持本质上攻击者在通信两端之间对通信内容进行嗅探和篡改，以达到插入数据和获取关键信息的目的。
### 2)实现
- **域名劫持**

  通过劫持掉域名的DNS解析结果，将HTTP请求劫持到特定IP上，使得客户端和攻击者的服务器建立TCP连接，而非和目标服务器直接连接，这样攻击者就可以对内容进行窃取或篡改。在极端的情况下甚至攻击者可能伪造目标网站页面进行钓鱼攻击。一般而言，用户上网的DNS服务器都是运营商分配的，所以，在这个节点上，运营商可以为所欲为。
  
  例如，访问http://jiankang.qq.com/index.html，正常DNS应该返回腾讯的ip，而DNS劫持后，会返回一个运营商的中间服务器ip。访问该服务器会一致性的返回302，让用户浏览器跳转到预处理好的带广告的网页，在该网页中再通过iframe打开用户原来访问的地址。

- **HTTP劫持/直接流量修改**
  
  在数据通路上对页面进行固定的内容插入，比如广告弹窗等。在这种情况下，虽然客户端和服务器是直接建立的连接，但是数据内容依然可能遭到野蛮破坏。例如在运营商的路由器节点上，设置协议检测，一旦发现是HTTP请求，而且是html类型请求，则拦截处理。后续做法往往分为2种，1种是类似DNS劫持返回302让用户浏览器跳转到另外的地址，还有1种是在服务器返回的HTML数据中插入js或dom节点（广告）。

### 3)产生原因
能够实施流量劫持的根本原因，是HTTP协议没有办法对通信对方的身份进行校验以及对数据完整性进行校验。如果能解决这个问题，则流量劫持将无法轻易发生。
### 4)防御
- **https防止劫持**

- **被动监测**

  通过采集用户访问站点的ip地址来和我们真实站点以及CDN节点的ip地址进行比对，判断是否遭到DNS劫持。或者通过采集用户访问的URL和真实站点的URL进行比对，判断是否遭到链路劫持。
  ```js
  window.addEventListener('DOMNodeInserted', checkDivHijack);    
  function checkDivHijack(e) {
    var html = e ? (e.srcElement.outerHTML || e.srcElement.wholeText) : $('html').html();
    var reg = /http:\/\/([^\/]+)\//g;
    var urlList = html.match(reg);
    if (!urlList || urlList.length == 0) {
      return;
    }
    reg = /^http:\/\/(.*\.qq\.com|.*\.gtimg\.cn|.*\.qlogo\.cn|.*\.qpic\.cn|.*\.wanggou\.com)\/$/;
    var hijack = false;
    for (var i = 0; i < urlList.length; i++) {
      if (!reg.test(urlList[i])) {
        hijack = true;
        break;
      }
    }
  }
  ```


# B)密码学知识
RSA算法基于一个十分简单的数论事实：将两个大素数相乘十分容易，但那时想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥。
### 1)对称加密
这类算法在加密和解密时使用相同的密钥，或是使用两个可以简单地相互推算的密钥。实务上，这组密钥成为在两个或多个成员间的共同秘密，以便维持专属的通讯联系。与公开密钥加密相比，要求双方取得相同的密钥是对称密钥加密的主要缺点之一。堆成加密的缺点还有：当一方的秘钥丢失暴露，所有共享的人的信息安全都会有威胁。
### 2)非对称加密
每个个体生成自己的(公钥-私钥)，对方用你的公钥加密信息给你，你自己用私钥解密。
### 3)RSA原理
公钥是私钥使用单向加密函数生成的，意味着你能用1+99推导出答案100，但你不能根据100推导出它是怎么来的，因为有无数个结果。
https://www.zhihu.com/question/25038691






# C)HTTPS
https://blog.csdn.net/winwill2012/article/details/71774469