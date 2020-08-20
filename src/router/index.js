import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const CategoryData = () => import('../views/categorydata/CategoryData.vue')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail.vue')

// 1安装插件
Vue.use(VueRouter)

// 2创建路由对象
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    // 动态路由
    path:'/detail/:iid',
    component:Detail
  },
  {
    path:'/categorydata/:iid',
    component:CategoryData
  }

]

const router = new VueRouter({
  routes,
  // 去掉# 启动history模式
  // mode:'history'
  mode:'hash'
})


// 3.导出
export default router