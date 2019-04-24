

> 用以介绍正则一些概念
## 正则表达式
下面是一个简单的匹配 "包含数字" 的正则表达式。每个正则都是由元字符和修饰符组成的，//之间包含的字符都是元字符。
```js
/\d/.test('asdf2') // true
```

#### 标准字符（元字符）
| 字符 | 含义 |
| :-: | :-: |
| \d | 匹配数字字符 |
| \D | 匹配非数字字符 |
| \w | 匹配任意字母，数字，下划线 |
| \W | 匹配任意非数字，字母，下划线 |
| \s | 匹配任何空白符 |
| \S | 匹配任何非空白字符 |
| \r | 回车符 |
| \n | 换行符 |

| x\|y | x或者y的一个 |


#### 定位字符
| 字符 | 含义 |
| :-: | :-: |
| ^ | 以某一个元字符开头 |
| $ | 以某一个元字符结尾 |

#### 普通字符
| 字符 | 含义 |
| :-: | :-: |
| [ ] | 表示字符集合 |
| [^] | ^在里面就是取反的意思 |
| [^] | ^在里面就是取反的意思 |
| [+*?.] | +*?.在里面自是字符本身的意思 |

```js
[xyz]      x、y、z中的任意一个
[^xyz]     除了xyz中的任意一个字符
[a-z]      匹配a-z中的任意一个字符
[^a-z]     匹配除了a-z中的任意一个字符
```

#### 量词
?*+，记住顺序

| 字符 | 含义 |
| :-: | :-: |
| + | 出现一到多次  |
| * | 出现零到多次 |
| ? | 出现零到一次  |
| {n} | 出现n次 |
| {n,} | 出现n到多次 |
| {n,m} | 出现n-m次 |



#### 分组
| 字符 | 含义 |
| :-: | :-: |
| ( ) | 正则中的分组 |

这里\1表示把捕获到的第一组再引用一次,就等同于abcdabc
```js
/(abc)d\1/.test('abcdabc') // true
```


#### 反向引用
用()捕获的内容，根据从左到右的顺序从1开始自动编号。通过反向引用，可以对已捕获的进行引用\number就是编号

（pattern） 捕获组
这里\1表示把捕获到的第一组再引用一次，就等同于abcdabc
```js
/(abc)d\1/.test('abcdabc')
```

（?:pattern） 非捕获组
匹配表达式中的内容，但是不存储.
```js
/stor(?:y|ies)/.test('story')
```


#### 转义
想要匹配点号，需要在前面加上转义符
```js
/\d?/.test('01') // true
```

#### 零宽断言（预搜索）
零宽断言表示匹配字符的时候再添加一些定位条件，使匹配更精准。
| 表达式 | 含义 |
| :-: | :-: |
| (?=pattern)  | 断言此位置 **后面能匹配** pattern |
| (?!pattern)  | 断言此位置 **后面不能匹配** pattern |
| (?<=pattern) | 断言此位置 **前面能匹配** pattern |
| (?<!pattern) | 断言此位置 **前面不能匹配** pattern |

```js
/love (?=story)/.test('I love story!')
// 能够匹配: I love story!

/love (?!story)/.test('I love stories!')
// 能够匹配: I love stories!
```

#### 贪婪g & 惰性?
贪婪模式指的是值匹配时，是至多还是至少
```js
/\d{3,5}/.test('012345678')
|01234|5678|
// 贪婪模式：按照最多的5个匹配，然后匹配3个

/\d{3,5}?/.test('012345678')
|012|345|678|
// 非贪婪模式：按照最少的3个来匹配

'abc888def'.replace(/\d+?/, 'b')
// abcb88def 非贪婪

'abc888def'.replace(/\d+/g, 'b')
// abcbdef 默认就是贪婪，所以加不加g无所谓

'678ba01DCan'.replace(/([a-z]+?)(\d+)([A-Z]+?)/, '0');
// 678((ba)(01)(D))Can --> 678(0)Can

'678ba01DCan'.replace(/[a-z]+/, '0');
// 678(ba)01DCan --> 678(0)01DCan

'678ba01DCan'.replace(/[a-z]+?/, '0');
// 678(b)a01DCan --> 678(0)a01DCan

'678ba01DCan'.replace(/[a-z]+/g, '0');
// 678(ba)01DC(an) --> 678(0)01DC(0)

'678ba01DCan'.replace(/([a-z]+)?/, '0');
// 678ba01DCan --> (0)678ba01DCan 表示括号前面匹配0~1次，所以匹配到了最开始的位置插入

'abcde1'.replace(/[a-z]\d/, '-')
// abcd-

'abcde1'.replace(/[a-z]?\d/, '-')
// abcd-

'a0bcde1'.replace(/[a-z]\d?/, '-')
// -bcde1
```
**贪婪模式不影响正则的量词，影响的是匹配完成后，是否还会继续匹配余下的**



## test方法
检测是否满足某个正则
```js
/\d?{3,5}/.test('01')
```


## exec方法，match方法
它们两个对比着说，exec是正则的方法，match是字符串的方法。match受贪婪模式影响，exec不受
```js
const str = 'b3ai hellow ku f4ai'
const reg = /\dai/

console.log(str.match(reg)) // ["3ai"]
console.log(reg.exec(str))  // ["3ai"]
```

```js
const str = 'b3ai hellow ku f4ai'
const reg = /\dai/g

console.log(str.match(reg)) // ["3ai", "4ai"]
console.log(reg.exec(str))  // ["3ai"]
```

exec返回的是一个类数组，只有result[0]有元素，其他全部通过key访问




## replace方法
替换满足条件的字符串
```js
// 非贪婪模式
var str = 'aaaaa'         // str不受影响
str.replace(/\w/, 'b')    // "baaaa"
str.replace(/\w/g, 'b'    // "bbbbb"

// /g 全局匹配，/i 不区分大小写
var str2 = 'b3ai hellow ku f4ai'
str2.replace(/\dai/g, 'v') // bv hellow ku fv
```

replace的第二个参数还有一些用法
| 字符 | 含义 |
| :-: | :-: |
| $1,$2, ...$99 | 将下一个字符标记为特殊字符 |
| $& | 与regexp相匹配的子串 |
| $` | 位于匹配子串左侧的文本 |
| $' | 位于匹配子串右侧的文本 |
| $$ | 直接量符号 |

第二个参数形式：

**\$1, \$2**
表示正则中的分组
```js
'aa11AA'.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$1'); // "aa"
'aa11AA'.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$2'); // "11"
'aa11AA'.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$3'); // "AA"
'aa11AA'.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$4'); // "$4"

'aa11AA'.replace(/([a-z]+)(\d+)([A-Z]+)/g, function($1, $2, $3){
  console.log($1, $2, $3)
});


```

**\$`, \$', \$$**
用子串左边或者右边的部分，来替换子串
```js
'a1bc2de3f'.replace(/[a-z]\d[a-z]/, '?')
// ?c2de3f
'a1bc2de3f'.replace(/[a-z]\d[a-z]/g, '?')
// ???

'a1bc2de3f'.replace(/[a-z]\d[a-z]/, '$`')
// c2de3f   用(a1b)左边的来替换a1b，那就是置空了
'a1bc2de3f'.replace(/[a-z]\d[a-z]/, "$'")
// c2de3fc2de3f   用(a1b)右边的来替换a1b

'aa11AA'.replace(/(\d+)/g, '$$');
// "aa$AA" 如果想用$替换，写两个即可
```


## 常见正则

```js
/** 电话号码正则，固话，手机 */
/0\d{2,3}-\d{7,8}/
/1[34578]\d{9}/

/** 邮箱 */
/\w+@[a-zA-Z0-9]+(.[a-zA-Z]{2,4}){1,2}/
// test@qq.com.cn
```


## 验证码提取
现在我们希望通过正则，提取出验证码：

【京东】尊敬的用户，634561是您本次的省份验证码，30分钟内有效，请完成验证。
【滴滴】您的验证码是6678，请在页面中提交验证码完成验证。
【百度】376687（动态验证码），请在30分钟内填写。

```js
// 把非数字的标记出来
var reg = /((?:验证码\D*)(\d{6}|\d{4}))|((\d{6}|\d{4})(?:\D*验证码))/;
var str = '【百度】376687（动态验证码），请在30分钟内填写。'

function getVerifyCode(str) {
  return new Promise((resolve, reject) => {
    str.replace(/(\d{6}|\d{4})(?:\D*验证码)/, (all, $1)=>{
      resolve($1)
    })
  })
}

getVerifyCode(str).then(res=>{
  console.log(res)
})
```
