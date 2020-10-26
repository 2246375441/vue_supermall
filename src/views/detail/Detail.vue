<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="contenthe" ref="Homescroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <deta-comment-info :commentInfo="commentInfo" ref="comment"></deta-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTo"></back-top>
    <deta-bottom-bar @addToCart="addToCart" @isDetaInfo="isDetaInfo"></deta-bottom-bar>
    <!-- <toast  :message="message" :show="show"></toast> -->
    <deta-info :isDetaInfo="isInfo" :skuInfo="skuInfo" :shop="shop" :iid="iid" @infoClose="infoClose"></deta-info>

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
import DetaBottomBar from './childComps/DetaBottomBar'
import DetaInfo from './childComps/DetaInfo'

import BackTop from '../../components/content/backTop/BackTop'

import Scroll from '../../components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail.js'
import {debounce} from '../../common/utils'

import GoodsList from '../../components/content/goods/GoodsList'

// import Toast from '../../components/common/toast/Toast';

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
      getThemeTopY:null,
      positionY:0,
      currentIndex:0,
      isShowBackTo:false,
      // message:'',
      // show:false
      // 购物车数据
      skuInfo:{},
      // 加入购物车显示隐藏
      isInfo:false
    }
  },
  created() {
    // 1 保存传入的iid
    this.iid = this.$route.params.iid

    // 2 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log('true1')
      // console.log(res);
      // 简写 const data = res.data.result
       const data = res.data.result
      //  console.log(data.skuInfo);

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
      

      // 获取商品 加入购物车时 选择框内部数据
      this.skuInfo = data.skuInfo
      // console.log(this.skuInfo);

      
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
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log('true2')
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
    GoodsList,
    DetaBottomBar,
    BackTop,
    DetaInfo,
    // Toast
  },
  methods: {
    imageLoad(){
      this.$refs.Homescroll.refresh()

      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index)
      this.$refs.Homescroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      const positionY = -position.y

      let length = this.themeTopYs.length

      for(let i=0;i<length;i++){

        // if(this.currentIndex !== i &&((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i ===
        // length -1 && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }


        // DetailNavBar滚动到 位置时  改变  [商品，参数，评论，推荐]
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

      }

      // 判断 返回按钮backTop 隐藏还是现实
      this.isShowBackTo = position.y <-1000


    },
    backClick(){
      this.$refs.Homescroll.scrollTo(0,0,500)
    },
    addToCart(){
      // 1 获取购物车 需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product)
      // console.log(this.goods)

      // 2 将商品添加到购物车里(使用了vuex)
      // ↓    mutations
      // this.$store.commit('addCart',product)
      // ↓☆  actions  将数据发送到vuex 中
      // this.$store.dispatch('addCart',product)  
      this.$store.dispatch('addCart',product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ""
        // },1500)
        this.$toast.show(res,1500)
        console.log(res)
      })
    },
    // 加入购物车的显示与隐藏
    isDetaInfo(isInfo){
      // console.log(isInfo);
      this.isInfo = isInfo
    },
    infoClose(){
      this.isInfo = false
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
  height: calc(100% - 44px - 52px);
}

.detail-nav{
  position: relative;
  z-index: 999;
  background-color: #fff;
}
</style>