# JSSDK

调用方式都是下面类型：
```js
// 需要用到回调函数的
jxfd.xxxx(function(data){
  ...
})
// 不需要用到回调函数的
jxfd.xxxx({...})
```
xxx是sdk的名称（deviceType，navBar...），data就是返回的参数示例

---

## 1.0 deviceType
**获取设备类型**

返回参数示例
```js
jxfd.deviceType(function(data){
    //...
})
/**
 * 0：安卓
 * 1：iOS
 */
{
  devicetype: 1 | 2
}
```

## 2.0 navBar
**设置激活的tabbar，这个方法不需要回调函数，直接调用即可**

调用示例
```js
jxfd.navBar(function(data){
    //...
})
/**
 * 按照顺序，表示第一个~第四个tab按钮
 */
jxfd.navBar({
  navId: 1 | 2 | 3 | 4
})
```

## 3.0 close
**关闭webview使用，这个方法不需要回调函数，直接调用即可**

调用示例
```js
/**
 * 调用即会关闭web窗口
 */
jxfd.close()
```


## 4.0 phones
**获取联系人**

返回参数示例
```js
jxfd.phones(function(data){
    //...
})
/**
 * 通讯录，联系人返回结果
 */
{
  phones:[{
    phone_name: '张三',
    phone_number: '+8613260634648,13265656565,13260634546'
  },{
    phone_name: '王电费',
    phone_number: '1326063'
  },{
    ...
  }]
}
```



## 5.0 ocr
**获取身份证ocr信息**

返回参数示例
```js
jxfd.ocr(function(data){
    //...
})
/**
 * OCR返回结果
 * 对，没错，key就是用的中文
 */
{
  "公民身份号码":"",
  "签发机关":"",
  "有效期限" :"",
  "签发日期" :"",
  "公民身份号码" :"",
  "姓名" :"",
  "民族" :"",
  "住址" :"",
  "前照" :"",
  "IsEdited" :"",
}
```



## 6.0 face
**获取人脸信息**

返回参数示例
```js
jxfd.face(function(data){
    //...
})
/**
 * face返回结果，
 * 具体里面每个key，问下海哥，我这边没看到这个
 * 【该结果获取后直接返回给后台】
 */
{
  "requestId": 0,
  "protobufId": "",
  "protobufData" : "",
  "imageBlink" : "",
  "imageOpenMouth" : "",
  "imageNod" : "",
  "imageShake" : "",
}
```



## 6.0 callrecord
**获取通话记录信息**

返回参数示例

```js
jxfd.callrecord(function(data){
    //...
})
/**
 * callrecord返回结果，当无法获取的时候records返回空数组[]
 * 具体record里面每条通话记录格式，问下海哥，我这边没看到这个
 * 【该结果获取后直接返回给后台】
 */
{
  records: [...]
}
```



## 7.0 browser
**app浏览器内跳转其他url使用，这个方法不需要回调函数，直接调用即可**

调用示例
```js
/**
 * 调用即会app内跳转其他链接
 */
jxfd.browser({
  url: 'https://www.baidu.com/'
})
```
