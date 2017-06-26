/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict'

const path = require('path');
const conf = require('./conf');
const webpack = require('webpack');

let baseConfig = {
  output: {
    path: path.join(__dirname, '..', (conf.isProduction ? 'release' : 'build')),
    publicPath: '',
    filename: conf.isProduction ? '[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'src'),
      path.join(__dirname, '..', 'node_modules')
    ],
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  plugins: [],

  externals: [
    {sqlite3: 'commonjs sqlite3'},
    {mysql: 'commonjs mysql'},
    {pg: 'commonjs pg'},
    {'pg-native': 'commonjs pg-native'}
  ],

  node:{
    __dirname:  false,
    __filename: false
  }
};

if (conf.isProduction) {
  baseConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      sourceMap: false,
      mangle: true
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  );
} else {
  baseConfig.plugins.push(
    new webpack.NamedModulesPlugin()
  );

  baseConfig.devServer = {
    host: conf.devServerHost,
    port: conf.devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true
  };
  baseConfig.output.publicPath = '//' + conf.devServerHost + ':' + conf.devServerPort + '/';
  // Source maps
  baseConfig.devtool = 'inline-source-map';
};

module.exports = baseConfig;
