import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import shop from './Shop'


// 1 安装插件
Vue.use(Vuex)

const state = {
  cartList: [],
  rexData:{}
}
// 2 创建Store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    shop
  }

})

// 3 挂载到vue实例上
export default store