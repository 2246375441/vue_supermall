<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="contenthe">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import Scroll from '../../components/common/scroll/Scroll'

import {getDetail,Goods,Shop} from '../../network/detail.js'

export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{}
    }
  },
  created() {
    // 1 保存传入的iid
    this.iid = this.$route.params.iid

    // 2 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      // 简写 const data = res.data.result
       const data = res.data.result

      // 1.获取顶部图片 轮播数据
      this.topImages = data.itemInfo.topImages
      

      // 2.获取商品信息
     
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
    })
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  }
}
</script>

<style>
#detail{
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
  
}

.contenthe{
  height: calc(100% - 44px);
}

.detail-nav{
  position: relative;
  z-index: 999;
  background-color: #fff;
}
</style>