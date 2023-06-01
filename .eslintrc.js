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
  rules: {
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'indent': 'off',
    'prefer-destructuring': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    'linebreak-style': 0,
    'vue/valid-v-slot':'off',
    'vue/no-dupe-keys':'off',
    'no-param-reassign':'off',
    'vue/no-mutating-props':'off',
    'vue/no-v-text-v-html-on-component': 'off',
  }
};
