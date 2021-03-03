import service from '../request'
export function getNormal () {
  console.log('请求了')
  return service.get('c/contentRichText/queryInfo',{
    params: { infoId:'5e547729d31e0a7a9188e22f' }
  })
}