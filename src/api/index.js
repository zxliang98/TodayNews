import axios from 'axios'

import localUser from '@/utils/localuser'
import router from '@/routers'

import JSONBIG from 'json-bigint'

// 对axios进行配置
// baseURL  作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// transformResponse 对 data 进行任意转换处理
axios.defaults.transformResponse = [(data) => {
  // 对 data 进行任意转换处理
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// 设置请求拦截器和响应拦截器

// 请求拦截器就是在每个请求之前处理每个请求
// 为所有的请求设置一个请求头，以正常获取接口内容（约定）

// 添加请求拦截器
axios.interceptors.request.use(function (req) {
  // 为每个请求设置一个请求头Authorization
  // `Bearer ${localUser.getUser().token}`固定格式
  let user = localUser.getUser() || {}
  req.headers.Authorization = `Bearer ${user.token}`

  // 在发送请求之前做些什么
  return req
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error.response)
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
