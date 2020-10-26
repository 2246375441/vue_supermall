const state = {
  showData : []
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
  }
}

export default {
  state,
  mutations,
  actions,
}