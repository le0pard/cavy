module.exports = {
  js: {
    src: [
      'gulpfile.js',
      'src/**/*.js',
      'webpack/*.js'
    ]
  },
  jsx: {
    src: ['src/**/*.jsx']
  },
  assets: {
    app:     './app/**/*.{html,json}',
    appDest: './build'
  }
}