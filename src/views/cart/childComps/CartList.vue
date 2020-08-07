<template>
  <div class="cart-list">
    <scroll class="content" ref="Homescroll">
      <cart-listitem v-for="(item,index) in cartList" :key="index" :itemInfo="item">

      </cart-listitem>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll'
import CartListitem from './CartListitem'

export default {
  name:'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListitem
  },
  activated() {
    this.$refs.Homescroll.refresh()
  },
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>