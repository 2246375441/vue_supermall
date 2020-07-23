<template>
<!-- ref -->
  <div class="wrapper" ref="Swrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
 name:'Scroll',
 data() {
   return {
     scroll:null
   }
 },
 props:{
   probeType:{
     type:Number,
     default:0
   }
 },
  mounted() {
  this.scroll = new BScroll(this.$refs.Swrapper,{
    click:true,
    probeType: this.probeType,
    })
    this.scroll.scrollTo(0,0)
    this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    }
  },
}
</script>

<style>

</style>