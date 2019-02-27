# SkeletonPlugin

- webpack自带的一些格式校验
```js
const optionsSchema = {
  "staticDir": {
    "description": "Required - The path to output the skeletoned index.html.",
    "type": "string"
  },
  "routes": {
    "description": "The routes of your application, and you want to generate the skeleton screen",
    "type": "array"
  },
  "port": {
    "description": "The port of Page skeleton webpack plugin",
    "type": "string"
  },
}

const validationErrors = webpack.validateSchema(optionsSchema, options)
```

- lodash/merge 合并对象
```js
const merge = require('lodash/merge')
```
