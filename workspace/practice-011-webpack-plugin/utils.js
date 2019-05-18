
//
// 我们来写一个工具函数，用于检测入参类型

let options = {
  userName: 'LiuYashion',
  userID: '420502199204232',
  contacter: {
    // name: 'Ofsd',
    phone: 13260634648
  }
}

let schema = {
  type: Object,
  errMsg: '请输入正确数据',
  properties: {
    userName: {
      type: String,
      errMsg: '请输入用户姓名'
    },
    userID: {
      type: String,
      errMsg: '请输入用户ID'
    },
    contacter: {
      type: Object,
      properties: {
        name: {
          type: String,
          errMsg: '请输入用户ID'
        },
        phone: {
          type: Number,
          errMsg: '请输入用户ID'
        }
      }
    },
    kkkk: ''
  }
}

// 校验类型
function validateOptions(schema, options, callback) {
  /** 属性是type的实例 */
  if (schema.properties instanceof schema.type) {
    /** 遍历key */
    for(let key in schema.properties){
      if (schema.properties[key].properties) {
        /** 判断值类型，如果对象类就递归 */
        validateOptions(schema.properties[key], options[key], callback)
      } else {
        /** 直接判断 */
        if (options[key] === undefined) {
          callback(schema.properties[key].errMsg, `key[${key}] has no value`)
        } else {
          if (schema.properties[key].type !== options[key].constructor) {
            callback( schema.properties[key].errMsg, `key[${key}] type not match`)
          }
        }
      }
    }
  } else {
    callback(schema.errMsg)
  }
}

validateOptions(schema, options, (result, resson)=>{
  console.log(result, resson)
})
