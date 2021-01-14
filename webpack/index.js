const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// polyfill node_modules
const babelPolyfill = require('@babel/polyfill');

const theme = {};

/**
 * 基础webpack配置
 */
module.exports = ((projectAbsolutePath, options, customConfig = {}) => {
  const {
    isProduction = false,
    entry = './src/index.js',
    template = 'src/index.ejs',
    favicon = '',
    publicPath = '/',
    outputPath = 'dist',
    extraTheme = {},
    alias = {},
    port = 8000,
    proxy = {},
    host = '0.0.0.0',
  } = options;

  Object.keys(extraTheme).forEach(ele => {
    theme[ele] = extraTheme[ele];
  });


  let modes = {};
  if (isProduction) {
    modes = {
      mode: 'production',
      stats: 'minimal'
    };
  }

  const config = merge(
    {
      entry,
      output: {
        path: path.resolve(projectAbsolutePath, outputPath),
        publicPath,
        filename: isProduction ? '[name].[contenthash].js' : '[name].[hash:8].js',
        libraryTarget: 'umd'
      },
      ...modes,
      optimization: {
        chunkIds: 'named',
        moduleIds: 'named',
        minimize: isProduction,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true
              },
              output: {
                comments: false
              }
            },
            extractComments: false
          })
        ],
      },
      resolve: {
        alias,
        extensions: ['.js', '.json', '.ts']
      },
      plugins: [
        new HtmlWebpackPlugin({
          template,
          favicon,
        }),
        new MiniCssExtractPlugin({
          filename: isProduction
            ? '[name].[contenthash].css'
            : '[name].[hash:8].css'
        }),
        ...(isProduction ? [new OptimizeCssAssetsPlugin()] : []),
      ],
      module: {
        rules: [
          /**
           * 添加对组件中 less 和 CSS Modules 的支持
           * @see https://github.com/webpack-contrib/css-loader
           */
          {
            test: /\.less$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                  },
                  importLoaders: 1
                }
              },
              {
                loader: 'less-loader',
                // 添加主题文件到 less 变量配置中
                options: {
                  modifyVars: theme,
                  javascriptEnabled: true
                }
              }
            ],
            include: [
              // 应用源码目录
              path.resolve(projectAbsolutePath, './src'),
            ]
          },
          /**
           * 添加对 CSS 的支持
           */
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          /**
           * 需要 Babel 编译的 JS
           */
          {
            test: /\.js?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    '@babel/plugin-proposal-export-default-from',
                  ]
                }
              }
            ],
            include: [
              // 应用源码目录
              path.resolve(projectAbsolutePath, './src'),
            ]
          },
          /**
           * ts 编译
           */
          {
            test: /\.(ts)?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                  ],
                  plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    '@babel/plugin-proposal-export-default-from',
                  ],
                },
              }
            ],
          },
          /**
           * svg压缩
           */
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  // 设置转base64大小上限
                  limit: 100000
                }
              },
              {
                loader: 'svgo-loader',
                options: {
                  plugins: [{ removeViewBox: false }]
                }
              }
            ]
          },
          /**
           * 图片压缩
           */
          {
            test: /\.(png|jpe?g)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 100*1024
                }
              },
            ]
          },
          /**
           * 其他静态资源
           */
          {
            test: /\.(woff|woff2|eot|ttf|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 100* 1024
            }
          },
          /**
           * 支持模块化引入html文件
           */
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader'
            }
          }
        ]
      },
      devServer: {
        // 端口号，webpack-dev-server --port 8080
        port,
        host,
        // 适应 History API，404 跳到 index.html
        historyApiFallback: true,
        // 启动服务后打开浏览器
        open: true,
        // 启动热更新
        hot: true,
        inline: true,
        // 编译错误显示到页面中
        overlay: {
          errors: true
        },
        proxy
      }
    },
    customConfig
  );
  return config;
})
