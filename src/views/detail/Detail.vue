<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="contenthe" ref="Homescroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <deta-comment-info :commentInfo="commentInfo" ref="comment"></deta-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetaCommentInfo from './childComps/DetaCommentInfo'

import Scroll from '../../components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail.js'
import {debounce} from '../../common/utils'

import GoodsList from '../../components/content/goods/GoodsList'


export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null
    }
  },
  created() {
    // 1 保存传入的iid
    this.iid = this.$route.params.iid

    // 2 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log('true1')
      // 简写 const data = res.data.result
       const data = res.data.result

      // 1.获取顶部图片 轮播数据
      this.topImages = data.itemInfo.topImages
      

      // 2.获取商品信息
     
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4. 保存商品详情信息
      this.detailInfo = data.detailInfo

      // 5.保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    
      // 6.保存评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
        // console.log(this.commentInfo)
      }
      
      
      
    }),

    // 3 请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.data.list
    })
      
      
      // 4 给getThemeTopY赋值  进行防抖
    this.getThemeTopY = debounce(() => {
        this.themeTopYs=[]
        // navbar 点击跳转
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        console.log('true2')
    })
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetaCommentInfo,
    GoodsList
  },
  methods: {
    imageLoad(){
      this.$refs.Homescroll.refresh()

      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index)
      this.$refs.Homescroll.scrollTo(0,-this.themeTopYs[index],100)
    }
  },
  mounted() {
    // const refresh = debounce(this.$refs.Homescroll.refresh,50)
    // this.$bus.$on('datailimgLoad',() => {
    //   refresh()
    //   console.log('防抖')
    // })
  },
  updated() {
    
  },
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