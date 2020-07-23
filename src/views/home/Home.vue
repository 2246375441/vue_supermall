<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="Homescroll">
      <home-swiper :banners="banners" ref="hSwiper">
      </home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <this-week></this-week>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <!-- native   @click不能监听组件   加上修饰符native  则可以 -->
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import {getHomeGoods} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommends from './childComps/HomeRecommends'
import ThisWeek from './childComps/ThisWeek'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'
export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommends,
    ThisWeek,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      result:null,
      banners:[], 
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
    }
  },
  // 声明周期函数  首页创建完成之后 直接触发
  created() {
    // 1 请求多个数据
    this.getHomeMultidata()

    // 2 请求goods 商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /** 
    * 事件监听相关方法
    */
    tabClick(index){
      // console.log(index)
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick(){
      // this.$refs.Homescroll.scroll.scrollTo(0,0)
      // console.log(this.$refs.Homescroll.scroll)

      this.$refs.Homescroll.scrollTo(0,0,500)
    },



    /** 
    * 网络请求相关方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // 将端口数据存入 data中的result中
      this.result = res

      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    }) 
    },

    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
      // console.log(res)
      this.goods[type].list.push(...res.data.data.list)
      this.goods[type].page += 1
      // console.log(page)
      })
    },
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },

}
</script>



<style scoped>
/* scoped作用域 */
#home{
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}
.tab-control{
  /* 粘贴定位 */
  position: sticky;
  top:44px;
  background-color: #fff;
}
.content{
  height: calc(100% - 93px);
  margin-top: 44px;
  /* height:100%; */
  /* overflow: hidden; */
}
</style>