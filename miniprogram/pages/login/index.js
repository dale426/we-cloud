// miniprogram/pages/login/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''
  },
  bindKeyInput: function(e) {
    let name = e.currentTarget.dataset.key
    let val = e.detail.detail.value
    this.setData({
      [name]: val
    });
  },
  handlerLogin: function() {
    let data = this.data;
    if (!data.name || !data.password) {
      return wx.showToast({
        title: '账号和密码不能为空',
        icon: 'none'
      })
    }
    wx.showLoading({
      title: '登录中...',
    })
    wx.cloud.callFunction({
      name: 'login',
      data: data,
      complete: res => {
        wx.hideLoading();
        if (res.errMsg === 'cloud.callFunction:ok') {
          if (res.result.success) {
            app.globalData.token = res.result.appid.substr(0, 10) + '-liyulong0808';
            wx.redirectTo({
              url: '/pages/m_erp/home',
            })
          } else {
            wx.showToast({
              title: '账号或密码错误！',
              icon: 'none',
              duration: 2500
            })
          }
        } else {
          wx.showToast({
            title: '网络出错，稍后重试',
            icon: 'none'
          })
        }
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})