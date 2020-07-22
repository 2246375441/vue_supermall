<template>
  <div class="good">
    <!-- {{goods}} -->
  <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index">
  </goods-list-item>
  </div>
</template>

<script>

import GoodsListItem from './GoodsListItem'

export default {
  name:"GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {

    }
  },
}
</script>

<style>
.good{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>