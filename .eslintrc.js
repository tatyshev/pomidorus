// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['html'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jasmine: true,
  },
  globals: {
    the: true,
  },
  extends: 'airbnb-base',
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  'rules': {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
