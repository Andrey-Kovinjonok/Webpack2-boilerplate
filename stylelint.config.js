module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    // 'stylelint-config-standard',
    // 'stylelint-config-css-modules',
  ],
  rules: {
    'color-hex-case': 'lower',
  },
  syntax: 'scss',
};
