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
   },
   pullUpLoad:{
     type:Boolean,
     default:false
   }
 },
  mounted() {
  this.scroll = new BScroll(this.$refs.Swrapper,{
    click:true,
    probeType: this.probeType,
    pullUpLoad:this.pullUpLoad
    })
    this.scroll.scrollTo(0,0)
    // 监听滚动的位置
    this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
    })
    // console.log(this.scroll)

    // 监听上拉事件
    this.scroll.on('pullingUp',() => {
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })

  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
      // console.log('-------')
    }
  },
}
</script>

<style>

</style>