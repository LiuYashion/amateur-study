[https学习](https://www.jianshu.com/p/fb6035dbaf8b)

# https
https在http的传输层之上，增加了一个安全层（SSL、TLS协议实现），功能如下：

- 数据的保密性
- 双方身份真实性
- 数据的完整性

### 1）保密性
用非对称算法随机加密出一个对称密钥，然后双方用对称密钥进行通信。具体来说，就是客户端生成一个随机密钥，用服务器的公钥对这个密钥进行非对称加密，服务器用私钥进行解密，然后双方就用这个对称密钥来进行数据加密了。

### 2）真实性
证书的合法性可以向CA验证。数字证书主要包含以下信息：
- 证书颁发机构
- 证书颁发机构签名
- 证书绑定的服务器域名
- 证书版本、有效期
- 签名使用的加密算法（非对称算法，如RSA）
- 公钥
  
客户端收到服务器的响应后，先向CA验证证书的合法性（根据证书的签名、绑定的域名等信息），如果校验不通过，浏览器会中止连接，向用户提示证书不安全。

### 3）完整性
> 哈希算法：哈希算法能够将任意长度的字符串转化为固定长度的字符串，该过程不可逆，可用来作数据完整性校验

服务器在发送报文之前做了3件的事：

- 用哈希算法对报文提取定长摘要
- 用私钥对摘要进行加密，作为数字签名
- 将数字签名附加到报文末尾发送给客户端

客户端接收到报文后：

- 用公钥对服务器的数字签名进行解密
- 用同样的算法重新计算出报文的数字签名
- 比较解密后的签名与自己计算的签名是否一致，如果不一致，说明数据被篡改过。