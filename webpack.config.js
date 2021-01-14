const createWebpackConfig = require('./webpack');
const theme = require('./themes');

/**
 * 判断开发环境和生产环境作配置上的区分
 */
const isProduction = 'production' === process.env.NODE_ENV;

module.exports = createWebpackConfig(__dirname, {
  isProduction,
  entry: './public/index.ts',
  template: './public/index.ejs',
  favicon: './public/thoughtworks.png',
  extraTheme: theme(),
  port: 8000,
  host: 'localhost',
  proxy: {
    '/mock': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
});
