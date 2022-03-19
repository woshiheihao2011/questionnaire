import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import * as types from '@/store/mutation-types'
import router from '@/router'
import {URL} from '@/config'

let http = new Vue()
// axios 配置
axios.defaults.timeout = 300000
axios.defaults.baseURL = URL
let flag = false
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
        case 401:
          store.commit(types.LOGOUT)
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 422:
          error.response.data.error = error.response.data.code
          break
        case 404:
          break
        case 506:
          // 506服务器自定义错误状态集中捕获
          error.response.data.error = JSON.parse(error.response.request.responseText)
          // Vue.prototype.$Message.error(error.response.data.error.error)
          // 限制提示信息
          if (!flag) {
            flag = true
            Vue.prototype.$Message.error(error.response.data.error.error)
            setTimeout(() => {
              flag = false
            }, 1500)
          }
          break
        case 500:
          let temp = /{".+"}$/
          if (temp.test(error.response.data)) {
            error.response.data = error.response.data.match(temp)[0]
            error.response.data = JSON.parse(error.response.data)
          }
          if (typeof error.response.data == 'string') {
            error.response.data = {error: http.$t('serverErrorAlrt')}
          } else {
            error.response.data.error = error.response.data.error ? error.response.data.error : http.$t('serverErrorAlrt')
          }
          break
      }
    } else if (error.message.toLowerCase().includes(String('Network Error').toLowerCase())) {
    } else {
      // 增加非api错误的拦截
      // Vue.prototype.$Message.error(http.$t('serverErrorAlrt'))
      // 限制提示信息
      if (!flag) {
        flag = true
        Vue.prototype.$Message.error(http.$t('serverErrorAlrt'))
        setTimeout(() => {
          flag = false
        }, 1500)
      }
    }
    return Promise.reject(error.response && error.response.data || error)
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
  }
)

export default axios
