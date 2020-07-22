<template>
  <div id="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" 
    :class="{active:index === currentIndex}" @click="tabClick(index)" :key='index'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'tabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    tabClick(index){
      this.currentIndex = index
    }
  },
}
</script>

<style scoped>
#tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
}
.tab-control-item{
  flex: 1;
  height: 40px;
  line-height: 40px;
    font-weight: 900;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color:var(--color-high-text);
  font-weight: 900;
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>