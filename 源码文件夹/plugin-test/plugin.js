
const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    console.log(111, compiler.plugin)
  }
}

module.exports = DefPlugin


