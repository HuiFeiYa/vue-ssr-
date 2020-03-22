const Router = require('koa-router')
const router = new Router()
const isDev = process.env.NODE_ENV === 'development'
const { log } = require('./controller/index')
const handleRequest = isDev ? require('./dev') : require('./prd')
// 和 src/router 中的routes 保持一致，定义路由是为了使那些没有注册的路由会走到 notFound 中间件的逻辑中
router.get('/index', log, handleRequest)

module.exports = router
