module.exports = {
  configureWebpack:{
    resolve:{
      // 配置末尾.js vue
      // extensions:[]
      // 配置别名
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}