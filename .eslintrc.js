module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential", 
    "eslint:recommended", 
    // "@vue/prettier"
  ],
  parserOptions: {
    parser: "babel-eslint"  // Webpack和Babel开发的项目，需要指定parser使用babel-eslint
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": 0,//允许出现未使用过的变量  0:off 1:warn 2:error
    "vue/no-parsing-error": [ // 解决 Parsing error: x-invalid-end-tag
      2,
      {
        "x-invalid-end-tag": false
      }
    ]
  }
};
