import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false

// 生成一个vue实例  用来存储$bus 
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
