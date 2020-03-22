import Vue from 'vue'
import Router from 'vue-router'
import Index from 'src/components/HelloWorld.vue'
Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      }
    ]
  })
}

