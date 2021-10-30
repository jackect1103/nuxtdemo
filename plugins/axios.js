/**
 * 通过注册拦截器或者改变全局设置来定制化axios, 你需要创建一个nuxt plugin
 * @param {*} param0 
 */


export default ({ app: { $axios} }) => {
  $axios.defaults.baseURL = process.env.baseUrl
  $axios.defaults.timeout = 30000

  /**
   * 请求拦截
   */
  $axios.onRequest(config => {
    
    config.headers = {
      'Content-Type': 'application/json',
    }

    config.headers['authorization'] = 'Bearer e7sDimLDutrGorY3qQIYJJ4lgWeo44CG'

    let data = {}

    if (config.method.toUpperCase() === 'GET') {
      data = config.params || {}
      config.params = data
    } else {
      // POST 需要塞入 data
      data = config.data || {}
      config.data = data
    }
    return config;
  })

  /**
   * 响应拦截
   */
  $axios.onResponse(response => {
    let { status } = response.data
    if (status === 0) { // 请求成功
      
    } else if (status === 20000) { //失败时返回(品牌名已存在)

    } else if (status === 100100) { //失败时返回(品牌记录不存在或已被删除)

    }
    return response.data;
  })

  /**
   * 错误拦截 401用户未授权
   */
  $axios.onError(error => {
    console.log('Making request to ' + error.response.config.url)
    switch (error.response.status) {
      case 403:
        // 重定向到 403 页
        redirect('/error/403')
        break;
      case 404:
        // 重定向到 404 页
        redirect('/error/404')
        break;
      case 500:
        // 重定向到 500 页
        redirect('/error/500')
        break;
      default:
        break;
    }
  })
}
