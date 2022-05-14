import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

export default function ({ redirect, route, store, $i8n, params }, inject) {
  // create an axios instance
  const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60 * 1000 // request timeout
  })

  service.interceptors.request.use(
    config => {
      // do something before request is sent
      if (getToken()) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers.Authorization = `Bearer ${getToken()}`
      }
  
      // 添加多語系參數
      let langValue = params.lang || 'TW'
      // 後端英文使用US
      langValue = langValue === 'EN' ? 'US' : langValue
      if (config.method === 'get') {
        if (!config.params) {
          config.params = {}
        }
        config.params.lang = langValue
      } else {
        if (!config.data) {
          config.data = { lang: langValue }
        } else {
          config.data.lang = langValue
        }
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  
  // response interceptor
  service.interceptors.response.use(
    response => {
      if (response.config.responseType === 'blob') {
        return response
      } else {
        const res = response.data
        return res
      }
    },
    error => {
      error.isHttpError = true
      const { response } = error
      if (response) {
        switch (response.status) {
          case 400:
            console.error(error)
            break
          case 401:
            console.error(error)
            store.dispatch('user/resetToken')
            redirect({ name: 'lang-login', params: { lang: route.params.lang || 'TW' } })
            break
          default:
            console.error(error)
        }
      }
      Message.error(error.response?.data?.resultMsg || $i8n.t('connection_error'))
      return Promise.reject(error)
    }
  )

  inject('axios', service)
}