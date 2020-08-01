<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

     <tab-control :titles="['流行','新款','精选']" v-show="isTabFixed"
      @tabClick="tabClick" 
      ref="tabControl1" 
      class="tabControlwk"
      ></tab-control>

    <scroll class="content" ref="Homescroll" :probe-type='3' @scroll="contentscroll" :pull-up-load="true" @pullingUp="imagLoad">
      <home-swiper :banners="banners" ref="hSwiper" @loadswiperimg='loadswiperimg'>
      </home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <this-week></this-week>
      <tab-control :titles="['流行','新款','精选']"  
      @tabClick="tabClick" 
      ref="tabControl2" 
      ></tab-control>
      <good-list :goods="showGoods" style="background-color: white;"></good-list>
    </scroll>

    <!-- native   @click不能监听组件   加上修饰符native  则可以 -->
    <back-top @click.native="backClick" v-show="isShowBackTo"></back-top>
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
import {debounce} from '../../common/utils'
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
      isShowBackTo:false,
      // offsetTop 获取对象相对于offsetParent属性指定的父坐标(css定位的元素或Body元素)距离顶端高度
      tabOffseTop:0,
      isTabFixed:false,
      saveY:0
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


    // 3.赋值

  },
  mounted() {
      // 监听GoodsListitem.vue中 @load 发送出来的数据
      // 刷新 scroll中 更新scrollerHeight 可以拉动的高度
    //   this.$bus.$on('itemImageLoad' ,() => {
    //   console.log(this.$refs.Homescroll.scroll)
    //   this.$refs.Homescroll && this.$refs.Homescroll.scroll.refresh()
    // })

    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.Homescroll.refresh,50)
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })

    


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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      // this.$refs.Homescroll.scroll.scrollTo(0,0)
      // console.log(this.$refs.Homescroll.scroll)

      this.$refs.Homescroll.scrollTo(0,0,500)
    },
    contentscroll(position){
      // console.log(position)
      // 1 判断backtop 是否显示 
      this.isShowBackTo = position.y <-1000

      // 2 决定tabControl 是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffseTop - 40
    },
    // 上拉加载
    imagLoad(){
      this.getHomeGoods(this.currentType)
    },
    loadswiperimg(){
    // 2.获取tabControl 的 offsetTop
    // 所有的组件都有一个属性$el 用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)
    this.tabOffseTop = this.$refs.tabControl2.$el.offsetTop
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
      // 再次 可以触发 pullUpLoad 下拉监听
      this.$refs.Homescroll.scroll.finishPullUp()
      })
    },
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },

  activated() {
    // 刷新  下面
    this.$refs.Homescroll.refresh()
    this.$refs.Homescroll.scrollTo(0,this.saveY)
  },
  deactivated() {
    this.saveY = this.$refs.Homescroll.scroll.y
    // console.log(this.saveY)
  },

}
</script>



<style scoped>
/* scoped作用域 */
#home{
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */

}
.tab-control{
  /* 粘贴定位 */
  position: sticky;
  top:44px;
  background-color: #fff;
}
.content{
  height: calc(100% - 93px);
  /* margin-top: 44px; */
  /* height:100%; */
  overflow: hidden;
}
.tabControlwk{
  position:fixed;
  z-index: 9;
  right: 0;
  left: 0;
  background-color: white;
}
</style>