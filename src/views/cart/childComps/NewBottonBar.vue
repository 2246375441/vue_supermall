<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isChe" @click.native="checkCilck"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{maxPriceV}}
    </div>

    <div class="calculate" @click="cartPayment">
      去计算
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
export default {
  name:'NewBottonBar',
  data() {
    return {
      
    }
  },
  components:{
    CheckButton
  },
  computed: {
    // 显示是否全选状态
    isChe(){
      this.$store.commit('SET_CHE_MAX')
      return this.$store.state.shop.is
    },
    maxPriceV(){
      return this.$store.state.shop.maxPrice
    }
  },
  methods: {
    // 点击全选
    checkCilck(){
      this.$store.commit('SET_CHE_CLICK')

      this.$store.commit('SET_MAX_PRICE')
    },
    // 购物车支付
    cartPayment(){
      // 中心小提示框
      this.$toast.show('支付模块暂时木有开发',2000)
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