// pages/appointment/appointment.js
import { request } from '../../api/index.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parentsInfo: {
      teacherId: '',
      subjectName: '',
      grade: '',
      weekDay: '',
      startTime: '',
      endTime: '',
      contactType: 2, // 1手机号 2微信号
      contactNumber: ''
    },
    contact: {
      phoneNumber: '',
      wxNumber: ''
    },
    subject: { name: '英语', code: 'subject003' },
    subjectActions: [
      { name: '语文', code: 'subject001' },
      { name: '数学', code: 'subject002' },
      { name: '英语', code: 'subject003' },
    ],
    contactType: { name: '微信号', value: 2, type: '微信' },
    showAction: false,
    actions: [
      { name: '手机号', value: 1, type: '手机' },
      { name: '微信号', value: 2, type: '微信' },
    ],
    showWeekAction: false,
    week: { name: '星期一', value: 1 },
    weekActions: [
      { name: '星期一', value: 1 },
      { name: '星期二', value: 2 },
      { name: '星期三', value: 3 },
      { name: '星期四', value: 4 },
      { name: '星期五', value: 5 },
      { name: '星期六', value: 6 },
      { name: '星期日', value: 7 }
    ]
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
    console.log('app.globalData.currentTeacher', app.globalData.currentTeacher)
    this.setData({ parentsInfo: {...this.data.parentsInfo, teacherId: app.globalData.currentTeacher.id }})
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

  onWeekActionSelect (e) {
    this.setData({ week: e.detail })
  },

  onWeekActionClose () {
    this.setData({ showWeekAction: false });
  },

  onWeekChange () {
    this.setData({ showWeekAction: true });
  },

  onSubjectActionSelect (e) {
    this.setData({ subject: e.detail })
  },

  onSubjectActionClose () {
    this.setData({ showSubjectAction: false });
  },

  onSubjectChange () {
    this.setData({ showSubjectAction: true });
  },

  onContactTypeChange () {
    this.setData({ showAction: true });
  },

  onActionClose (e) {
    this.setData({ showAction: false })
  },

  onActionSelect(e) {
    this.setData({ contactType: e.detail })
  },

  onParentsInfoChange (e) {
    const item = e.currentTarget.dataset.item
    const changeData = {}
    changeData[item] = e.detail
    this.setData({ parentsInfo: {...this.data.parentsInfo, ...changeData } })
  },

  onContactChange (e) {
    const item = e.currentTarget.dataset.item
    const changeData = {}
    changeData[item] = e.detail
    this.setData({ contact: {...this.data.contact, ...changeData } })
  },

  onSubmit () {
    const { contact, subject, week } = this.data
    const { wxNumber, phoneNumber } = contact
    const { name: subjectName, code: subjectCode } = subject
    const { value: weekDay } = week
    const contactType = this.data.contactType.value // 2-微信号
    let contactNumber
    if (contactType === 1) { contactNumber = phoneNumber }
    if (contactType === 2) { contactNumber = wxNumber }
    const data = {
      ...this.data.parentsInfo,
      contactNumber,
      contactType,
      subjectName,
      subjectCode,
      weekDay
    }
    console.log('data', data)
    request({ url: `/appointment`, data, method: 'POST' }).then((res) => {
      Toast.success({
        mask: true,
        message: '预约成功',
        onClose: () => {
          wx.navigateBack({ delta: 3 })
        }
      });
    })
  }
})