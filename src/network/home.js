import {request} from './request';

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}


// http://152.136.185.210:8000/api/n3/home/data?type=pop&page=1
// http://152.136.185.210:8000/api/n3/home/data?type=new&page=1
// http://152.136.185.210:8000/api/n3/home/data?type=sell&page=1
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}


