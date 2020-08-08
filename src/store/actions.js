export default{
  // 添加购物车
  // addCart(context,payload){
  //   // payload 也可以使用，查找是否有一样的商品  下面是简便方法
  //   let oldProduct = null
  //   for(let item of context.state.cartList){
  //     if(item.iid === payload.iid){
  //       oldProduct = item
  //     }
  //   }
  //   // let oldProduct = context.state.cartList.find(i => i.iid === payload.iid)
  //   // 查找state中 cartList.iid 有没有 跟传过来的数据payload.iid 一样的  有返回true  没有则un..

  //   // 2判断oldProduct
  //   if(oldProduct){
  //     // 当条件为true 数量+1
  //     context.commit('addCounter',oldProduct)
  //   }else{
  //     // 当条件为false 商品+1
  //     payload.count =1
  //     context.commit('addToCart',payload)
  //   }
  // }

  // 添加购物车
  addCart(context,payload){
    return new Promise((resolve,reject) => {
    let oldProduct = null

    for(let item of context.state.cartList){
      if(item.iid === payload.iid){
        oldProduct = item
      }
    }

    if(oldProduct){   //数量+1
      context.commit('addCounter',oldProduct)
      resolve('当前的商品数量+1')
    }else{  //添加新的商品
      payload.count =1
      context.commit('addToCart',payload)
      resolve('当前新的商品')
    }
    })
  }



}