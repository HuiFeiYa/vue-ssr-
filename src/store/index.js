import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 业务逻辑都单独放在每个页面的 asyncData 方法中，服务端渲染时会执行页面中定义的方法，并且将这些数据存储在 store 中
export function createStore() {
  return new Vuex.Store({
    state: {
    },
    actions: {
    },
    mutations: {
    }
  })
}
