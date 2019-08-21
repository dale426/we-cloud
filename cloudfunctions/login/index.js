// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// const DB = wx.cloud.database({
//   env: 'dale-foot-test'
// })
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const DB = cloud.database()
  let {
    name,
    password
  } = event
  let res = await DB.collection('user').where({
      name,
      password
    })
    .get();
  if (res.errMsg === 'collection.get:ok' && res.data.length) {
    return {
      success: true,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
    }
  } else {
    return {success: false}
  }
  
}