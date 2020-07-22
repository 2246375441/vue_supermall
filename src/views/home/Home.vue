<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" ref="hSwiper">
    </home-swiper>
    <home-recommends :recommends="recommends"></home-recommends>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommends from './childComps/HomeRecommends'

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommends
  },
  data() {
    return {
      result:null,
      banners:[], 
      recommends:[],
    }
  },
  // 声明周期函数  首页创建完成之后 直接触发
  created() {
    // 1 请求多个数据
    getHomeMultidata().then(res => {
      // 将端口数据存入 data中的result中
      this.result = res

      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    })
  },
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}
</style>