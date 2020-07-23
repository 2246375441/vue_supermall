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
  mounted() {
  this.scroll = new BScroll(this.$refs.Swrapper,{
    click:true,
    probeType: 2,
    })
    // this.scroll.scrollTo(0,0)
    // this.scroll.on('scroll',(position) => {
    //   console.log(position)
    // })
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