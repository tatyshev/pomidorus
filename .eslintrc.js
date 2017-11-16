module.exports = {
  root: true,
  plugins: ['html'],
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
    jasmine: true,
  },
  globals: {
    given: true,
  },
  'rules': {
    'import/no-unresolved': [0],
    'import/extensions': [0],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
