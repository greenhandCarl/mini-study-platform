//app.js
App({
  onLaunch: function () {
    this.initUserInfo()
  },
  globalData: {
    userInfo: null,
    currentTeacher: {}
  },
  initUserInfo () {
    const openid = wx.getStorageSync('openid') || ''
    if (openid && !this.globalData.userInfo) { this.globalData.userInfo = { openId: openid } }
    if (openid && this.globalData.userInfo) { this.globalData.userInfo = { ...this.globalData.userInfo, openId: openid } }
  }
})