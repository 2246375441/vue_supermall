export default{
  // 添加购物车  =>  添加完成 要执行的两条函数  ①  数量+1
  addCounter(state,payload){
    payload.count++
  },
  // 添加购物车  =>  添加完成 要执行的两条函数  ②  商品+1
  addToCart(state,payload){
    state.cartList.push(payload)
  }
}