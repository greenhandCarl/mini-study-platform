//index.js
import { request } from '../../api/index.js'
import { login, getSubjects } from '../../api/request.js'
import { wxLogin } from '../../api/wxapi.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    courses: [],
    isShowSign: false
  },
  async onLoad (option) {
    await this.initOpenId()
    this.initCourses()
  },
  onShow () {
    this.initSignPopup()
  },
  getUserInfo: function(e) {
  },
  async initOpenId () {
    try {
      const res = await wxLogin()
      const result = await login({ code: res.code })
      // 设置到global中 转驼峰
      app.globalData.userInfo
        ? app.globalData.userInfo = { ...app.globalData.userInfo, openId: result.openid }
        : app.globalData.userInfo = { openId: result.openid }
      // 设置到缓存中 不转驼峰
      wx.setStorageSync('openid', result.openid)
      return true
    } catch (err) {
      console.log('wxLogin err.errMsg', err.errMsg)
      return Promise.reject(err)
    }
  },
  setShowSign (e) {
    this.setData({ isShowSign: e.detail.isShowSign })
  },
  initSignPopup () {
    if (app.globalData.isShowSign) {
      this.setData({ isShowSign: true })
      app.globalData.isShowSign = false // 已经显示过一次登录弹窗 这里关闭
    }
  },
  initCourses () {
    getSubjects().then((res) => {
      this.setData({courses: res.data})
    })
  },
  goCourse (e) {
    console.log('e', e)
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/teacherList/teacherList?type=${type}`
    })
  },
  onCourseClick () {
    console.log('onCourseClick')
    wx.navigateTo({
      url: '/pages/courses/courses',
      complete: (res) => {},
      fail: (res) => { console.log('res', res) },
      success: (result) => {},
    })
  }
})
