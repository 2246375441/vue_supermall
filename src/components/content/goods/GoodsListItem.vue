<template>
  <div class="goods" @click="itemClick">
		<!-- @load 监听 图片加载 -->
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p class="info">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
			<!-- <button @click="itemClick">按钮</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
	},
	methods: {
		imageLoad(){
			// console.log('imageLoad')
			// 将数据发射到 事件总线 中 $bus中，在Home.vue中接收
			this.$bus.$emit('itemImageLoad')
		},
		itemClick(){
			// 将数据传入 详情页
			this.$router.push('/detail/'+this.goodsItem.iid)
		}
	},
	
}
</script>

<style>
.goods {
	padding-bottom:40px;
	position:relative;
  width: 45%;
  z-index: -99;
}
.goods img {
	width:100%;
  border-radius: 5px;
}
.goods-info {
	font-size:12px;
	position:absolute;
	bottom:5px;
	left:0;
	right:0;
	overflow:hidden;
	text-align:center;
}
.goods-info p {
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	margin-bottom:3px;
}
.goods-info .price {
	color:var(--color-high-text);
	margin-right:20px;
}
.goods-info .collect {
	position:relative;
}
.goods-info .collect::before {
	content:'';
	position:absolute;
	left:-15px;
	top:0;
	width:14px;
	height:14px;
	background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>