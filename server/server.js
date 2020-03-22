const Koa = require('koa')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()
const router = require('./router')
console.log('process.env.NODE_ENV--------', process.env.NODE_ENV)
app.use(router.routes()).use(router.allowedMethods())
app.use(koaMount('/dist', koaStatic(resolve('../dist'))))
app.use(koaMount('/public', koaStatic(resolve('../public'))))
const port = 9000

// 捕获代码中未捕获的致命错误
process.on('uncaughtException', err => {
  console.log('uncaughtException : ', err)
})
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app
