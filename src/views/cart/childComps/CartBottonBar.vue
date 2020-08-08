<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkCilck"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'   //可以用... 代替 vuex中的getters.js 映射成局部计算属性
export default {
  name:'CartBottonBar',
  components:{
    CheckButton
  },
  computed: {
    // 合计
    totalPrice(){
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
      
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      // 原点 选中 和 未选中 状态
      // 0取反为true  >0 取反为false
      // 先从整个数组中 筛选有没有没被选中的 ，有的话 length长度会加1 

      if(this.$store.state.cartList.length === 0) return false

      // 1 使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)

      // 2 使用find
      return !this.$store.state.cartList.find(item => !item.checked)

      // 3 使用便利for
      // for(let item of this.$store.state.cartList){
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkCilck(){
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
}
</script>

<style scoped>
.bottom-bar{
  border-top:solid 1px rgb(224, 224, 224);
  height: 40px;
  position: relative;
  background-color: rgb(242, 242, 242);
  display: flex;
  align-items: center;
}
.check-content{
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 10px;
}
.check-button{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.price{
  margin-left: 20px;
}

.calculate{
  background-color: rgb(255, 129, 152);
  height: 100%;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:white;
  position: absolute;
  right: 0;

}
</style>