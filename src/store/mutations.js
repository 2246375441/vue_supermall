export default{
  // 添加购物车  =>  添加完成 要执行的两条函数  ①  数量+1
  addCounter(state,payload){
    payload.count++
  },
  // 添加购物车  =>  添加完成 要执行的两条函数  ②  商品+1
  addToCart(state,payload){
    payload.checked = true
    state.cartList.push(payload)  
  },
  cartDele(state,payload){
    // state全部值   payload发送值
    console.log(payload.iid)  
    var cs = null
    for (let i = 0; i < state.cartList.length; i++) {
      if(state.cartList[i].iid == payload.iid){
        cs = i
        console.log(cs)
        state.cartList.splice(cs,1)
      }
    }
  },
  constAddMu(state,payload){
    payload.count ++
  },
  constMinusMu(state,payload){
    if(payload.count == 1){
      payload.count = 1
    }else{
      payload.count --
    }
  }

}