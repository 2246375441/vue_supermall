<template>
  <div class="wk" v-if="Object.keys(categoryitemtab).length !== 0" >
    <!-- <button @click="cccccc">2222</button> -->
    <div v-for="(item,index) in categoryitemtab[categorytab].data" :key="index" class="wkitem">
      <div class="wkitem-dw">
        <img v-lazy="item.img" alt="" class="wkitem-img">
        <div class="wkitem-wzq">
          <div class="wkitem-wz">{{item.title}}</div>
          <div>
            ￥ {{item.price}}☆ {{item.cfav}}
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name:'CategoryItemTab',
  props:{
    categoryitemtab:{
      type:Object,
      default(){
        return  {}
      }
    },
    categorytab:{
      type:String,
      default(){
        return  'pop'
      }
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.wk{
  width: 100%;
  height: 100%;
  /* background-color: tomato; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.wkitem{
  width: 47%;
  height: 39vh;
  margin-bottom: 5px;
  /* background-color: red; */
}
.wkitem-dw{
  position: relative;
  height: 100%;
}
.wkitem-img{
  width: 100%;
}
.wkitem-wzq{
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
}
.wkitem-wz{
  width: 20vh;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>