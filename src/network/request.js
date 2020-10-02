import axios from 'axios'

export function request(config){
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:10000
  })


  // 2.axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res
  },err => {
  })

  // 3.发送真正的网络请求
  // instance(config)
  //   .then(res => {
  //     // console.log(res)
  //     success(res)
  //   })
  //   .catch(err => {
  //     // console.log(err)
  //     failure(err)
  //   })

    return instance(config)
    

} 
