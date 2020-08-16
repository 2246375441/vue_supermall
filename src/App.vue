<template>
<!-- 2020.8.16 -->
  <div id="app">
    <keep-alive exclude="Detail">
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
