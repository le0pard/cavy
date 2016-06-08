const webpackConf = require('./webpack/config')('test')

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files:    [
      './tests.webpack.js'
    ],
    frameworks:    ['phantomjs-shim', 'jasmine'],
    preprocessors: {
      './tests.webpack.js': ['webpack']
    },
    browserNoActivityTimeout: 120000,
    reporters:                ['dots'],
    webpack:                  webpackConf,
    webpackServer:            {
      noInfo: true
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-phantomjs-shim')
    ]
  })
}