module.exports = {
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-proposal-export-default-from',
      ],
    }
  }
}