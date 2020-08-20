<template>
  <div class="category">
    <!-- 商品分类标题 -->
    <nav-bar class="navbar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="categoryitem">
      <category-list :categoryList="categoryList" @liClick="liClick"></category-list>
      <div style="width: 100%;">
        <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick='tabClick'></tab-control>
        <scroll class="scrollwk" ref="TabScroll">
          <category-item :subcategory="subcategory" @imgload="imgload"></category-item>
          <category-item-tab :categoryitemtab='categoryitemtab' :categorytab="categorytab"></category-item-tab>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import {getCategory,getSubcategory,getCategoryDetail,POP, SELL, NEW} from '../../network/category'
import {debounce} from '../../common/utils.js'

import NavBar from '../../components/common/navbar/NavBar'
import Scroll from '../../components/common/scroll/Scroll'
import TabControl from '../../components/content/tabControl/TabControl'
import CategoryList from './childComps/CategoryList'
import CategoryItem from './childComps/CategoryItem'
import CategoryItemTab from './childComps/CategoryItemTab'

export default {
  name:'Category',
  data() {
    return {
      categoryAll:[],   //全部数据
      categoryList:[],  //list左边分类
      maitKey:3627,
      subcategory:{},   //存入分类对应数据  上面部分
      categoryData:{},
      currentIndex:-1,
      categoryitemtab:{},   //tab数据
      categorytab:'pop',        //['流行','新款','精选'] 点击值
      tab:{}                 //剥离的数据
    }
  },
  created() {
    // 获取初始化数据
    this._getCategory()
    this.getSubcategory(this.maitKey)  //获取正在流行数据 

  },
  methods: {
    _getCategory(){
      getCategory().then(res => {
          // 1.获取分类数据
          // console.log(res)
          this.categoryAll = res
          this.categoryList = this.categoryAll.data.data.category.list
          // console.log(this.categoryList)
        

        for (let i = 0; i < this.categoryList.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
            // console.log(this.categoryData)
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)

          // tab 初始数据 正在流行  index=0
          this.categoryitemtab = this.categoryData[0].categoryDetail
          // console.log(this.categoryitemtab)

      })



    },
    _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categoryList[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categoryList[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },




    // 使用maitKey 获得对应类数据
    getSubcategory(maitKey){
      getSubcategory(maitKey).then(res => {
        // console.log(res)
        this.subcategory = res.data.data
        // console.log(this.subcategory);

        this.$refs.TabScroll.refresh()

      })
    },
    refresh(){
      this.$refs.TabScroll.refresh()
      // console.log('refresh')
    },
    // 点击左边分类 获得maitKey
    liClick(index){
      this.maitKey=this.categoryList[index].maitKey
      // console.log('该分类端口maitKey值'+this.maitKey)
      this.getSubcategory(this.maitKey)


      this._getSubcategories(index)

      console.log(index)

      // 加载tab数据   将数据存入categoryitemtab
      this.categoryitemtab = this.categoryData[index].categoryDetail
      // console.log(this.categoryData[index].categoryDetail)
      // console.log(this.categoryitemtab)
    },
    imgload(){
      // console.log('加载')
      this.refresh()
      
    },


    tabClick(index){
      switch(index){
        case 0:
          this.categorytab = 'pop'
          break
        case 1:
          this.categorytab = 'new'
          break
        case 2:
          this.categorytab = 'sell'
          break
      }
      // console.log(this.categorytab)
      this.tab = this.categoryitemtab[this.categorytab]
      // console.log(this.tab);
      // 进行数据剥离  
      
    },
  },
  components:{
    CategoryList,
    Scroll,
    NavBar,
    TabControl,
    CategoryItem,
    CategoryItemTab
  },
}
</script>

<style scoped>
.navbar{
  position: fixed;
  background-color:rgb(255, 129, 152) ;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: #fff;
  z-index: 999;
}
.categoryitem{
  margin-top: 44px;
  display: flex;
}
.tab-control{
  width: 100%;
}
.scrollwk{
  height: calc(100vh - 45px - 40px - 50px);
  overflow: hidden;
}
</style>