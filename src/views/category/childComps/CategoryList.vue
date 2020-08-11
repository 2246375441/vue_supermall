<template>
  <div class="categorylist">
    <scroll class="kd">
      <div v-for="(item,index) in categoryList" :key="index">
      <li class="categorylist-li" @click="liClick(index)"
      :class="{liClass:index === isindex}"
      >{{item.title}}</li>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
export default {
  name:'CategoryList',
  data() {
    return {
      ispd:false,
      isindex:0
    }
  },
  props:{
    categoryList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Scroll
  },
  methods: {
    liClick(index){
      this.isindex = index
      this.$emit('liClick',index)
    }
  },
  
}
</script>

<style scoped>
.kd{
  height: calc(100vh - 49px - 44px);
}
.categorylist{
  height: 100vh;
  width: 100px;
  background-color:rgb(246, 246, 246);
}
.categorylist-li{
  width: 100%;
  height: 60px;
  line-height: 60px;
  list-style: none;
  text-align: center;
}
.liClass{
  background-color:rgb(255, 255, 255);
  border-left:solid 4px rgb(255, 87, 119) ;
  font-weight: 900;
  font-size: 18px;
}
</style>