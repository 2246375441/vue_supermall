<template>
    <div class="check-button" :class="{checked:isChecked}">
      <img src="../../../assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: solid 1.2px #aaa;
}
.checked{
  border-color: rgb(255, 129, 152);
  background-color: rgb(255, 129, 152);
}
</style>