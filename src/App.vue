<template>
<!-- 最近更新2020-10-26 添加完毕购物车功能！！！ -->
  <div id="app">
    <keep-alive exclude="Detail,CategoryData">
      <!-- keep-alive 缓存    exclude="Detail" 这页面不缓存 -->
    <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
