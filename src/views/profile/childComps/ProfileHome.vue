<template>
  <div class="nav">
    <div class="navwk">
      <img src="../../../assets/img/profile/svg/avatar.svg"  class="nav-img1">
      <div>
        <div class="wz1">
          登录|注册
        </div>
        <div class="wz2">
          <img src="../../../assets/img/profile/svg/phone.svg" class="nav-img2">
          暂无绑定手机号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ProfileHome',

}
</script>

<style scoped>
body{
  margin: 0;
  padding: 0;
  border: 0;
}
.nav{
  width: 100%;
  height: 100px;
  background-color: rgb(255, 129, 152)
}
.navwk{
  display: flex;
  align-items: center;
  height: 100%;
}
.nav-img1{
  width: 80px;
  margin-right: 10px;
}
.nav-img2{
  width: 25px;
}
.wz1{
  font-size: 18px;
  color: white;
}
.wz2{
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  margin-top: 5px;
}
</style>