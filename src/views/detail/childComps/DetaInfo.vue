<template>
  <div class="wk">
    <div class="info" v-if="isDetaInfo">
      <div class="infocon">
        <div class="infoClose" @click="infoClose">❌</div>
        <button @click="infoBtnData">打印获得数据</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isDetaInfo: {
      type: Boolean,
      default() {
        return false;
      },
    },
    skuInfo:{
      type: Object,
      default() {
        return {};
      },
    }
  },
  methods: {
    // 点击关闭X 发送隐藏flase
    infoClose() {
      this.$emit("infoClose");
    },
    infoBtnData(){
      console.log(this.skuInfo);
    }
  },
  computed: {},
};
</script>

<style scoped>

.info {
  position: fixed;
  top: 44px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.info .infocon {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60vh;
  background-color: #fff;
  padding: 7px;
  animation: infoAni 0.6s ease-out;
}

.infoClose {
  height: 20px;
  width: 100%;
  font-size: 20px;
  text-align: right;
  animation: infoAni 0.6s ease-out;
}

@keyframes infoAni {
  0% {
    height: 0;
  }
  100% {
    height: 60vh;
  }
}


</style>