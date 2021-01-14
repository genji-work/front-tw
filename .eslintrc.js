module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        "eslint-config-airbnb-base",
        'eslint-config-airbnb-base/rules/strict',
      ],
      parser: 'babel-eslint',
      files: ['*.js'],
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended'
      ],
      settings: {
        'import/resolver': {
          node: {
            extensions: [
              '.js',
              '.ts',
              '.d.ts'
            ]
          }
        }
      },
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json']
      },
      files: ['*.ts'],
      rules: {
        "no-undef": "off",
        "spaced-comment": "off",
        "require-jsdoc:": "off",
        "valid-jsdoc": "off",
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-array-constructor": "off",
        "@typescript-eslint/no-namespace": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-namespace-keyword": "off",
        "@typescript-eslint/type-annotation-spacing": "error",
        "import/no-unresolved": "off",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
          }
        ],
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/indent": [
          0,
          2,
          {
            "FunctionDeclaration": {
              "parameters": "off"
            },
            "FunctionExpression": {
              "parameters": "off"
            }
          }
        ],
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/ban-types": [
          "error",
          {
            "extendDefaults": true,
            "types": {
              "Function": false
            }
          }
        ],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/method-signature-style": [
          "error",
          "property"
        ],
        "@typescript-eslint/no-extra-non-null-assertion": "error",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-misused-promises": [
          "off",
          {
            "checksConditionals": false
          }
        ],
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-this-alias": [
          "error",
          {
            "allowDestructuring": true,
            "allowedNames": [
              "self"
            ]
          }
        ],
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-extra-semi": "error",

          // 禁止驼峰
        '@typescript-eslint/camelcase': 'off',
        // 可以用any,后续做类型拓展
        '@typescript-eslint/no-explicit-any': 'off',
        // 允许export default
        'import/prefer-default-export': 'off',
        // 参数不需要提前定义，后续可以打开
        '@typescript-eslint/member-ordering': 'off',
        // 可以使用 apply等方法
        'prefer-spread': 'off',
        // 允许定义undefined
        'init-declarations': 'off',
        // 禁止generator函数*后面的空格
        'generator-star-spacing': 'off',
        // 允许出现空内容改的function
        '@typescript-eslint/no-empty-function': 'off',
        // 命名允许出现下划线开头
        'no-underscore-dangle': 'off',
        // 取消导出的函数写明导出类型和参数类型
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      }
    }
  ]
}
