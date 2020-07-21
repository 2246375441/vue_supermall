<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="rgb(128,171,239)" >
        <img src="~assets/img/tabbar/首页.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/首页1.png" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category" activeColor="rgb(128,171,239)">
        <img src="~assets/img/tabbar/分类.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/分类1.png" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart" activeColor="rgb(128,171,239)">
        <img src="~assets/img/tabbar/购物车.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/购物车1.png" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>

      <tab-bar-item path="/profile" activeColor="rgb(128,171,239)">
        <img src="~assets/img/tabbar/我的.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/我的1.png" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from '../../common/tabbar/TabBar'
  import TabBarItem from '../../common/tabbar/TabBarItem'
export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>