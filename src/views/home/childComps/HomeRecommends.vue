<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:"HomeRecommends",
  data() {
    return {
      kz:''
    }
  },
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 15px 0;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex:1;
  width: 25%;
}
.recommend-item img{
  width: 90%;
}
</style>