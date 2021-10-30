import axios from 'axios'
import Vue from 'vue'
const { BASE_URL, API_URL } = require('./config');//获取封装的base_url和接口管理

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 20000, // request timeout 


})
// request interceptor
service.interceptors.request.use(
  config => {
    // console.warn('BASE_URL', BASE_URL, config)

    //只针对get方式进行序列化
    if (config.method === 'get') {

    }
    config.headers['authorization'] = 'Bearer e7sDimLDutrGorY3qQIYJJ4lgWeo44CG'
    return config
  },
  error => {
    console.log('request-error', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // console.log('response', response)
    const res = response.data
    // 测试服正常code为0
    if (res.code === 500 || res.code === 5100000 || res.code === 5100001) {

      return Promise.reject(new Error(res.message || 'Error'))
    } else if (res.code === 4003) {

    } else {
      return res
    }
  },
  error => {
    if (!error.response) {

      return
    }
    // 对错误进行自定义
    const statusCode = error.response.code
    const res = error.response.data
    if (statusCode === 4003) {

    } else if (statusCode === 4000000) {
    } else if (statusCode === 422) {
      const errDetail = Object.values(res.errors)

    } else if (statusCode === 403) {

    }
  }
)


export default ({ app }, inject) => {

  // Set the function directly on the context.app object
  app.$service = service
  app.$API_URL = API_URL
  Vue.prototype.$service = service
  Vue.prototype.$API_URL = API_URL
};