<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import { mapGetters } from 'vuex'   //可以用... 代替 vuex中的getters.js 映射成局部计算属性

export default {
  name:'Cart',
  components:{
    NavBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  },
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>