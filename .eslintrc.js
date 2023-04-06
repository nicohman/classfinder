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
  rules: {
//    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'm\ax-len': 'off',
    'vue/multi-word-component-names':'off',
    'vue/valid-v-slot':'off',
    'vue/no-unused-vars':'off',
    'vue/no-dupe-keys':'off',
    'vue/no-v-text-v-html-on-component':'off',
    'vue/no-mutating-props':'off'
  }
};
