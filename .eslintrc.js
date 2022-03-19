// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    // 'vue',
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "eqeqeq": 0, // 2必须使用全等，0可使用==
    'indent': 'off',
    // 'vue/script-indent': [
    //   'error',
    //   2,
    //   {
    //     'baseIndent': 1,
    //     'switchCase': 1, // 此处解决switch与case同缩进的问题
    //     "ignores": []
    //   }
    // ], // vue规范时解决script标签中export default缩进问题
    'spaced-comment': 0,
    'no-mixed-operators': 0 // 同样优先级的运算符加括号的配置关闭
  }
}
