<template>
    <swiper class="swiper-item">
      <!-- <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item> -->
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'

export default {
  name:'CategorySwiper',
  props:{
    topImages:{
      type:String,
      default(){
        return ''
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}

</script>

<style>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>