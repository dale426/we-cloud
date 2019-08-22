//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'dale-foot-test-yulong',
        // env: 'dale-foot-product-ee0d58',
        traceUser: true,
      })
    }
    this.globalData = {}
  },
  onShow: function() {
    if (!this.globalData.token) {
      // wx.redirectTo({
      //   url: '/pages/login/index',
      // })
    }
  },
  ajax: function(options) {
    let key = "wx10fbd2e3-liyulong0808";
    return new Promise((resolve, reject) => {
      // if (options.token !== key) {
      //   reject('登录已过期');
      //   return wx.redirectTo({
      //     url: '/pages/login/index',
      //   })
      // }
      wx.showLoading({
        title: '加载中...',
      })
      wx.cloud.callFunction({
        name: options.name,
        data: options.data,
      }).then(res => {
        wx.hideLoading();
        if (res.errMsg === 'cloud.callFunction:ok') {
          resolve(res.result)
        } else {
          wx.showToast({
            title: '云函数调用失败！',
            icon: 'none'
          })
          reject()
        }
      }).catch(e => {
        wx.hideLoading();
        wx.showToast({
          title: '云函数调用失败！',
          icon: 'none'
        })
        reject();
      })
    })
  }
})