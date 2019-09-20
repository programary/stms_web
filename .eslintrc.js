const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    ...strictEslint.rules,
    'lines-between-class-members': [0],
    'import/newline-after-import': [0],
    'no-confusing-arrow': [0],
  },
};
