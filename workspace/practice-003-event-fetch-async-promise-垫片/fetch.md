# fetch
fetch是浏览器自动支持的

## 新建

这里列举下response类型
- 1.  arrayBuffer
- 2.  blob
- 3.  formData
- 4.  json
- 5.  text

```js
// fentch
let response = await fetch(url, {
  method: 'POST',
  headers: new Headers({
    'Authorization': token
  }),
  mode: 'cors',
  body: formData
})

try {
  const responseJSON = await response.json()
  return responseJSON
} catch (err) {
  throw new Error(err)
}
```


```js
// fentch
let response = await fetch(url, {
  method: 'POST',
  headers: new Headers({
    'Authorization': token
  }),
  mode: 'cors',
  body: formData
})

try {
  const responseJSON = await response.json()
  return responseJSON
} catch (err) {
  throw new Error(err)
}
```


```js
// XMLHttpRequest
new Promise((resolve, reject) => {
  let requestObj
  if (window.XMLHttpRequest) {
    requestObj = new XMLHttpRequest()
  } else {
    requestObj = ActiveXObject
  }

  requestObj.open(type, url, true)
  requestObj.setRequestHeader('Authporization', token)
  requestObj.send(formData)

  requestObj.onreadystatechange = () => {
    if (requestObj.readyState == 4) {
      if (requestObj.status == 200) {
        let res = requestObj.response
        if (typeof res !== 'object') {
          res = JSON.parse(res)
        }
        resolve(res)
      } else {
        reject(requestObj)
      }
    }
  }
})
```

