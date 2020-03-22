const fs = require('fs')
const path = require('path')
const send = require('koa-send')
// 获取当前文件的绝对路径
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
// 创建一个 BunleRender 实例用于 renderer.renderToString 将 bundle 渲染为字符串
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('../src/index.temp.html'), 'utf-8'),
  clientManifest: clientManifest
})

const handleRequest = async ctx => {
  const url = ctx.path + ctx.search
  if (url.includes('.')) {
    console.log(`proxy ${url}`)
    return await send(ctx, url, { root: path.resolve(__dirname, '../dist') })
  }
  ctx.res.setHeader('Content-Type', 'text/html')
  // 在 2.5.0+ 版本中，此 callback 回调函数是可选项。在不传递 callback 时，此方法返回一个 Promise 对象，在其 resolve 后返回最终渲染的 HTML。
  ctx.body = await renderer.renderToString(Object.assign({}, ctx.state.deliver, { url }))
}
module.exports = handleRequest
