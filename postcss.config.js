
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const functions = require('postcss-functions');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

// const assets = require('./webpack/assets');

const stylelintConfig = require('./stylelint.config.js');

module.exports = {
  plugins: [
    functions({
      // glob: assets.stylesDirs.map(dir => path.resolve(dir, 'functions/*.js')),
    }),
    stylelint(stylelintConfig),
    precss,
    autoprefixer,
    reporter({
      clearMessages: true,
    }),
  ],
};
