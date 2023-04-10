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
//    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': process.env.ENV_OS === 'linux' ? 0 : ["error", "windows"],
    'm\ax-len': 'off',
    'vue/multi-word-component-names':'off',
    'vue/valid-v-slot':'off',
    'vue/no-unused-vars':'off',
    'vue/no-dupe-keys':'off',
    'vue/no-v-text-v-html-on-component':'off',
    'vue/no-mutating-props':'off',
    "linebreak-style": 0,
    "prefer-destructuring": ["error", {"object": true, "array": false}]
  }
};
