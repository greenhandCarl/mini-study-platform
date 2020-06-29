// pages/appointmentStatus/appointmentStatus.js
import { request } from '../../api/index.js'
import { dateMap } from '../../constants/index'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher: {},
    ext: [],
    dateMap: dateMap,
    selectDate: [],
    showDialog: false,
    // 时间选择器
    currentDate: '12:00',
    minHour: 10,
    maxHour: 20,
    appointing: false,
    isShowSign: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    const appointing = options.appoint
    this.setData({appointing: appointing === '1'})
    this.initTeacher(options.teacherId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const ext = JSON.parse(app.globalData.currentTeacher.ext)
    // this.setData({teacher: app.globalData.currentTeacher})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  setShowSign (e) {
    this.setData({ isShowSign: e.detail.isShowSign })
  },

  goAppointment () {
    if (app.globalData.userInfo) {
      wx.navigateTo({ url: '/pages/appointment/appointment' })
    } else {
      this.setData({ isShowSign: true })
    }
  },

  onDateSelect (value) {
    console.log('value',value)
    this.setData({ showDialog: true })
  },
  
  initTeacher (id) {
    request({ url: `/teacher/${id}` }).then((res) => {
      console.log('res', res)
      this.setData({teacher: res.data, ext: JSON.parse(res.data.ext)})
    })
  }
})