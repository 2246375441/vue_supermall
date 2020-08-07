<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
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