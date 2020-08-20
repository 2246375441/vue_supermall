<template>
  <div class="wk">
    <category-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></category-nav-bar>
     <!--上面缺少点击跳转部分   @scroll="contentScroll" -->
    <scroll class="contenthe" ref="Homescroll" :probe-type="3" >
      <category-swiper :top-images="topImages"></category-swiper>
      

    </scroll>
  </div>
</template>

<script>
import CategoryNavBar from './childComps/CategoryNavBar'
import CategorySwiper from './childComps/CategorySwiper'

import Scroll from '../../components/common/scroll/Scroll'
export default {
  name:'CategoryData',
  data() {
    return {
      iid:null,
      rexData:{},
      topImages:''
    }
  },
  created() {
    // 取得 vuex中 rex数据  
    this.rexData = this.$store.state.rexData
    console.log(this.rexData);
    // console.log(this.rexData.iid);


    this.topImages = this.rexData.img
  },
  mounted() {

  },
  methods: {
    titleClick(index){
      console.log(index)
      // this.$refs.Homescroll.scrollTo(0,-this.themeTopYs[index],100)
    },
  },
  components:{
    CategoryNavBar,
    Scroll,
    CategorySwiper
  }
}
</script>

<style scoped>
.wk{
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
}
.contenthe{
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>