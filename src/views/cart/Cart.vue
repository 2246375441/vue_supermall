<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list>

    </cart-list>

    <!-- 底部汇总 -->
    <cart-botton-bar>
      
    </cart-botton-bar>

  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottonBar from './childComps/CartBottonBar'

import { mapGetters } from 'vuex'   //可以用... 代替 vuex中的getters.js 映射成局部计算属性

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottonBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>