import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from './components/common/toast'

// import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})


// 生成一个vue实例  用来存储$bus 
// 添加事件总线对象$bus
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')



// 解决移动端 300ms
// Fastclick.attach(document.body)
