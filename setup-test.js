
console.log('TESTING ...');

const jsdom = require('jsdom').jsdom;

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

/*
console.log("BABEL SETUP ...")

global.DEV = false
// require('babel-register')
// require('babel-polyfill')
// global.document = require('jsdom').jsdom('<body></body>')
// global.window = document.defaultView
// global.navigator = window.navigator

require('babel-register')({
  ignore: /node_modules\/(?!capitalize\-word)/i
});
require('babel-polyfill')

const noop = function () {};

// If you want to ignore some CSS imports
require.extensions['.css'] = noop;
*/
