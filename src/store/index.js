import Vue from 'vue'
import Vuex from 'vuex'
import { getNormal } from '../common/api/index.js'
Vue.use(Vuex)
// 业务逻辑都单独放在每个页面的 asyncData 方法中，服务端渲染时会执行页面中定义的方法，并且将这些数据存储在 store 中
export function createStore() {
  return new Vuex.Store({
    state: {
      normalContent:''
    },
    mutations: {
      setNormal(state, value) {
        state.normalContent = value
      },
    },
    actions: {
      getNormal({ commit }, context) {
        return getNormal({infoId: context.infoId}).then(res=>{
          commit('setNormal', res.data)
        })
      }
    }
  })
}
