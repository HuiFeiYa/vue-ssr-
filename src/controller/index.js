exports.dealWxbParams = async function(ctx, next) {
  try {
    // 兼容大小写
    const CamelCase = {
      infoid: 'infoId',
      keyword: 'keyWord'
    }
    // 处理路径中的参数兼容大小写
    const query = ctx.request.query
    const params = Object.keys(query).reduce((acc, value) => {
      // 取出对于的大写 key 值 如果没有就是不需要转大小写的就用本身的value
      const key = CamelCase[value.toLocaleLowerCase()] || value
      acc[key] = query[value] || ''
      return acc
    }, {})
    // 判断pc移动端
    const platform = /Android|webOS|iPhone|iPod|BlackBerry/i.test(ctx.request.header['user-agent']) ? 'mobile' : 'pc'
    // 由于nginx反向代理的地址是 http:// 开头的所以这里用 host来判断使用的协议
    const protocol = ctx.host === 'wz.sczhbx.com' ? 'https://' : 'http://'
    const comefromUrl = protocol + ctx.request.host + ctx.request.url
    const context = Object.assign({}, { source: '', keyWord: '', infoId: '', articleNo: ctx.params.id || '', comefromUrl, platform }, params, { isLoadBaidu: true, isLoadTrack: true })

    ctx.state.deliver = context
    // 需要使用 await next也是个promise 函数需要等待它执行碗才能进行后面代码处理，否则可能会出现 404 notfound
    await next()
  } catch (error) {
    console.log('error', error)
    ctx.body = { error, success: false }
  }
}

exports.normal = async function(ctx, next) {
  const id = ctx.params.id
  ctx.state.deliver = { infoId: id }
  await next()
}
