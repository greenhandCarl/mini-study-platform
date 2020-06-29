// pages/mine/mine.js
import { getAppointments } from '../../api/request.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointments: [],
    currentPage: 1,
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.initPageInfo()
    this.initAppointments(1)
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
    console.log('onReachBottom')
    if (this.data.currentPage < this.data.totalPage) {
      const currentPage = this.data.currentPage + 1
      this.setData({ currentPage })
      this.onTurnPage(currentPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onTabItemTap () {
    if (!app.globalData.userInfo) {
      app.globalData.isShowSign = true
      wx.switchTab({ url: '/pages/index/index' })
    }
    console.log('onTabItemTap')
  },

  initPageInfo () {
    this.setData({ currentPage: 1 })
  },

  async initAppointments (currentPage) {
    const res = await getAppointments({ currentPage })
    this.setData({ appointments: res.data.dataList, totalPage: res.data.totalPage })
  },

  async onTurnPage (currentPage) {
    const { appointments = [] } = this.data
    const res = await getAppointments({ currentPage })
    this.setData({ appointments: [...appointments, ...res.data.dataList], totalPage: res.data.totalPage })
  },

  goAppointStatus (e) {
    const teacher = e.currentTarget.dataset.teacher
    // console.log('e.currentTarget.dataset.teacher', e.currentTarget.dataset.teacher)
    // app.globalData.currentTeacher = e.currentTarget.dataset.teacher
    // console.log('app.globalData.currentTeacher', app.globalData.currentTeacher)
    // wx.navigateTo({ url: '/pages/appointmentStatus/appointmentStatus' })
    // 只需要teacherId即可
    wx.navigateTo({ url: `/pages/appointmentStatus/appointmentStatus?teacherId=${teacher.teacherId}&appoint=1` })
  }
})