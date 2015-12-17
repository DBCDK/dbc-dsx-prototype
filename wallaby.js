var babel = require('babel');
var wallabyWebpack = require('wallaby-webpack');
//var tools = require('react-tools');

var webpackPostprocessor = wallabyWebpack({});

module.exports = function() {
  "use strict";
  return {
    files: [
      "client/**/*.js"
    ],
    tests: [
      "test/test*.js"
    ],

    preprocessors: {
      '**/*.js': file => babel.transform(file.content, {sourceMap: true})
      //'**/*.js': file => require('react-tools').transformWithDetails(file.content, {sourceMap: true, harmony: true})
    },

    postprocessor: webpackPostprocessor,

    bootstrap: function() {
      window.__moduleBundler.loadTests();
    }
  }
};