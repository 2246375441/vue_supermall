<template>
  <div class="cart-list">
    <scroll class="content" ref="Homescroll">
      <new-catr-item :showData="item" v-for="(item,i) in showData" :key="i">

      </new-catr-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
import NewCatrItem from './NewCatrItem'

export default {
  name:'NewCatr',
  components:{
    Scroll,
    NewCatrItem
  },
  activated() {
    this.$refs.Homescroll.refresh()
  },
  computed: {
    showData(){
      return this.$store.state.shop.showData
    }
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