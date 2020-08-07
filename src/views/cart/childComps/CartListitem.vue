<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :isChecked="itemInfo.checked" @click.native="checkedClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-deleft" @click="delectCilck">
          <img src="../../../assets/img/cart/delect.png" alt="" class="delectimg">
        </div>
        <div class="item-count right">
          <div @click="constAdd">
            <img src="../../../assets/img/cart/add.png" alt="" class="delectimg">
          </div>
          {{itemInfo.count}}
          <div @click="constMinus">
            <img src="../../../assets/img/cart/minus.png" alt="" class="delectimg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'
export default {
  name:'CartListitem',
  props:{
    itemInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      cartiid:null
    }
  },
  components:{
    CheckButton
  },
  methods: {
    checkedClick(){
      console.log('点击')
      this.itemInfo.checked = !this.itemInfo.checked
    },
    delectCilck(){
      // console.log(this.itemInfo.iid)
      this.cartiid = this.itemInfo
      // console.log(this.cartiid);
      this.$store.commit('cartDele',this.cartiid)
    },
    constAdd(){
      this.$store.commit('constAddMu',this.itemInfo)
    },
    constMinus(){
      this.$store.commit('constMinusMu',this.itemInfo)
    }
  },
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 13px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height:30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  /* .item-deleft{ */
    /* margin-right: 30%; */
  /* } */
  .delectimg{
    height: 20px;
    width: 20px;
  }
  .item-price{
    width: 30%;
  }
  .item-deleft{
    width: 10%;
    margin-right: 10%;
  }
  .item-count{
    margin-left:10% ;
    font-weight: 900;
  /* background-color: yellow; */
    width: 40%;
    display: flex;
    justify-content: space-around;
  }
</style>