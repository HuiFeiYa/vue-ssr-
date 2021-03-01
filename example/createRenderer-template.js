const Vue = require('vue')
const Koa = require('koa')
const server = new Koa()
const context = {
  title: 'vue ssr',
  metas: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
  `,
};
// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer(
  {
    template: require('fs').readFileSync('example/index.template.html','utf-8')
  }
)
  // Step 1: Create a Vue instance
  const app = new Vue({
    data(){
      return {
        number:0
      }
    },
    methods:{
      add() {
        this.number++
      }
    },
    template:`<div>
        <div>这里是段落: {{ number }}</div>
        <button @click="add">+</button>
    </div>`
  })
server.use( async ctx=>{

  app.add()
  // Step 3: Render the Vue instance to HTML
  renderer.renderToString(app, context, (err, html) => {
    if (err) throw err
    console.log(html)
    // => <div data-server-rendered="true">Hello World</div>
    ctx.body = html
  })
})
server.listen(9100,()=>{
  console.log('9100')
})