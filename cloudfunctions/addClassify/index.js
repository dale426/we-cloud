// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const DB = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    goodsName,
    goodsType,
    goodsDescription
  } = event

  if (res.errMsg === 'collection.get:ok') {
    if (res.data.length) {
      return {
        success: false,
        msg: '该商品已经存在'
      }
    } else {
      let dataInsert = await DB.collection('goods').add({
        data: {
          goodsName,
          goodsType,
          goodsDescription
        }
      })
    }
  } else {
    return {
      success: false,
      msg: '数据库操作失败'
    }
  }
}

// 校验商品是否存在
function isExistHandler() {
  // return new Promise()
  let res = await DB.collection('goods').where({
      goodsName,
      goodsType,
    })
    .get();
  if (res.errMsg === 'collection.get:ok' && res.data.length) {
    return {
      success: false,
      msg: '该商品已经存在'
    }
  } else {
    return {
      success: false,
      msg: '数据库操作失败'
    }
  }
}