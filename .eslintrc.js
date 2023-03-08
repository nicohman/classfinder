const rules = {
  // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  'max-len': 'off',
};

if (process.env.ENV_OS !== 'linux') { // [] wasn't acceptable
  rules['linebreak-style'] = ["error", "windows"];
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules,
};
