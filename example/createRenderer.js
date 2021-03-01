const Vue = require('vue')
const Koa = require('koa')
const server = new Koa()

server.use( async ctx=>{
  // Step 1: Create a Vue instance
  const app = new Vue({
    template:'<h1>这里是标题</h1>'
  })
  // Step 2: Create a renderer
  const renderer = require('vue-server-renderer').createRenderer()

  // Step 3: Render the Vue instance to HTML
  renderer.renderToString(app, (err, html) => {
    if (err) throw err
    console.log(html)
    // => <div data-server-rendered="true">Hello World</div>
    ctx.body = html
  })
})
server.listen(9100,()=>{
  console.log('9100')
})