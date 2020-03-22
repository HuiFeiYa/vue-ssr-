exports.log = async function(ctx, next){
  console.log('开始记录')
  await next()
}