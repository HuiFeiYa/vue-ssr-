import axios from 'axios'
const baseUrlMap = {
  development: 'https://test.wxb.com.cn/gateway/',
  release: 'https://test.wxb.com.cn/gateway/'
}
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV
const service = axios.create({
  baseURL: baseUrlMap[env]
})
service.interceptors.response.use(
  resopnse => {
    const { config, status } = resopnse
    console.log('*'.repeat(10), 'url', '*'.repeat(10), config.url)
    console.log('*'.repeat(10), '请求方式 method', '*'.repeat(10), config.method)
    console.log('*'.repeat(10), '请求参数', '*'.repeat(10), config.data)
    console.log('*'.repeat(10), 'status', '*'.repeat(10), status)
    const res = resopnse.data
    console.log('*'.repeat(10), 'code', '*'.repeat(10), res.code)
    if (res.code !== 10000) {
      return Promise.reject(new Error(res.message || '请求服务端报错'))
    } else {
      return res
    }
  },
  error => {
    console.log('*'.repeat(10), '请求出错 error', '*'.repeat(10))
    return Promise.reject(error)
  }
)

export default service
