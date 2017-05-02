/* eslint-disable no-var, strict, global-strict */
/* @flow weak */

'use strict';

const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./base');

const mainConfig = webpackMerge(baseWebpackConfig, {
  target: 'electron-main',
  entry: {
    main: ['./src/main.js']
  }
});

module.exports = mainConfig;
