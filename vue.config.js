const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const target = TARGET_NODE ? 'server' : 'client'
const path = require('path')
const webpack = require('webpack')
const resolve = file => path.resolve(__dirname,file)
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  // baseUrl Deprecated since Vue CLI 3.3, please use publicPath instead
  // 如果配置的是二级域名需要将二级域名和 publicPath 保持一致
  // 本地环境从 http://127.0.0.1:8080 服务下的内存文件中获取
  publicPath: isDev ? 'http://localhost:9090/' : '/dist',
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 9090
  },
  css: {
    extract: process.env.NODE_ENV === 'development'
  },
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: TARGET_NODE
      ? nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),new webpack.ProgressPlugin((percentage) => {
    })]
  }),
  chainWebpack: config => {
    config.resolve.alias.set('getData',resolve('src/getData')).set('src',resolve('src')).set('assets',resolve('src/assets')).set('utils',resolve('src/utils'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return merge(options,{
          optimizeSSR: false
        })
      })
    // fix ssr hot update bug
    if (TARGET_NODE) {
      config.plugins.delete('hmr')
    }
  }
}
