
const ConcatSource = require('webpack-sources').ConcatSource

const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");


class DefPlugin {
  constructor(options){
    this.definitions = {
      $: 'jquery'
    }
  }
  apply(compiler) {
    const definitions = this.definitions;
    compiler.hooks.compilation.tap("ProvidePlugin", (compilation, { normalModuleFactory }) => {
      const handler = (parser, parserOptions) => {
        Object.keys(definitions).forEach(name => {
          var request = [].concat(definitions[name]);
          var splittedName = name.split(".");

          parser.hooks.expression.for(name).tap("ProvidePlugin", expr => {
            let nameIdentifier = name;
            const scopedName = name.includes(".");
            let expression = `require(${JSON.stringify(request[0])})`;

          });
        });
      };
      normalModuleFactory.hooks.parser
        .for("javascript/auto")
        .tap("ProvidePlugin", handler);
      normalModuleFactory.hooks.parser
        .for("javascript/dynamic")
        .tap("ProvidePlugin", handler);
    });
  }
}

module.exports = DefPlugin


