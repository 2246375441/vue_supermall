<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div> 
    <div :style="activeStyle" :class="{active:true}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'yellow'
    },
    // hoverStyle:{
    //   type:String,
    //   default:'yellow'
    // }
  },
  data() {
    return {
      // isActive:true
    }
  },
  methods: {
    itemClick(){
      // console.log(this.path)
      this.$router.replace(this.path)
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== 0
      // return this.$route.path == this.path
      
    },
    // 字体默认色
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    },
    // hoverStyle(){
    //   return this.isActive ? {color:this.hoverStyle} : {}
    // }
  },
}
</script>

<style scoped>

  .tab-bar-item{
    flex: 1;
    text-align: center;
    /* tabbar高度一般都是49px */
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 图片自带向下3像素，vertical-align: middle;去除3像素 */
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: rgb(19,34,122);
    font-weight: 900;
  }
</style>