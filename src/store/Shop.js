

const state = {
  showData : [],
  is:false,
  maxPrice:0
}

const actions = {

}

const mutations = {
  // 进行判断 添加还是 添加数量
  SET_IF(state,params){
    if (state.showData.length>0) {
      for (let i = 0; i < state.showData.length; i++) {
        if(state.showData[i].iid==params.iid && state.showData[i].style==params.style && state.showData[i].size==params.size){
          state.showData[i].total = state.showData[i].total + params.total
          // console.log('添加商品数量')
          return
        }
      }
      // console.log('创建商品')
      state.showData.push(params)
    }else{
      // console.log('创建商品')
      state.showData.push(params)
    }
    // console.log(state.showData)
  },
  // 购物车内 每个选择按钮
  SET_CHE(state,params){
    params.checked = !params.checked 
  },
  // 购物车内 是否全选
  SET_CHE_MAX(state,params){
    if (state.showData.length>0) {
      for (let i = 0; i < state.showData.length; i++) {
        if (state.showData[i].checked) {
          state.is = true
        }else{
          state.is = false
        }
      }
    }else{
      state.is = false
    }
  },
  // 点击全选
  SET_CHE_CLICK(state,params){
    if (state.is) {
      for (let i = 0; i < state.showData.length; i++) {
        state.showData[i].checked = false
      }
    }else{
      for (let i = 0; i < state.showData.length; i++) {
        state.showData[i].checked = true
      }
    }
  },
  // 合计多少钱
  SET_MAX_PRICE(state){
    state.maxPrice = 0
    for (const item of state.showData) {
      if (item.checked) {
        state.maxPrice = state.maxPrice + (item.total*item.nowPrice)
      }
      // console.log(state.maxPrice)
    }
  },
  // 点击增加数量
  SET_ADD(state,params){
    if (params.total>=0) {
      params.total ++
    }
  },
  // 点击减少数量
  SET_JIAN(state,params){
    var showDataID = 0
    if (params.total>1) {
      params.total --
    }else if(params.total<=1){
      let dele = confirm('是否删除')
      if (dele) {
        // console.log('开始移除')
        for (const item of state.showData) {
          if (item.iid==params.iid && item.style==params.style && item.size==params.size) {
            showDataID = state.showData.indexOf(item)
            state.showData.splice(showDataID,1)
          }
        }
      }
    }
  }
}

export default {
  state,
  mutations,
  actions,
}