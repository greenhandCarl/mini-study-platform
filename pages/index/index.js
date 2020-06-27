//index.js
import { request } from '../../api/index.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    courses: [],
    isShowSign: false
  },
  onLoad: function (option) {
    this.initCourses()
  },
  onShow () {
    this.initSignPopup()
  },
  getUserInfo: function(e) {
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
    request({ url: '/subjects' }).then((res) => {
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
