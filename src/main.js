import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
Vue.config.productionTip = false

// 生成一个vue实例  用来存储$bus 
// 添加事件总线对象$bus
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
