// pages/teacherList/teacherList.js
import { request } from '../../api/index.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherList: [],
    chineseList: [{
        name: '王威',
        gender: '男',
        school: '清华大学',
        professional: '电子信息技术专业',
        introduce: '大学四级成绩590，大学六级成绩630，带过初三毕业班英语，学生单科进步30，自我感觉非常良好',
        img: '../../imgs/wangwei.png'
      },
      {
        name: '鲁健康',
        gender: '男',
        school: '武昌工学院',
        professional: '土木工程专业',
        introduce: '英语非常好，与印度老外无障碍沟通',
        img: '../../imgs/lujiankang.jpg'
      }
    ],
    engList: [
      {
        name: '王康',
        gender: '男',
        school: '清华大学',
        professional: '电子信息技术专业',
        introduce: '大学英语四级成绩590，大学六级成绩630，带过初三毕业班英语，学生单科进步30',
        img: '../../imgs/teacher0.png'
      },
      {
        name: '鲁威',
        gender: '男',
        school: '武昌工学院',
        professional: '土木工程专业',
        introduce: '英语非常好，与印度老外无障碍沟通',
        img: '../../imgs/teacher1.png'
      }
    ],
    mathList: [
      {
        name: '叶老师',
        gender: '女',
        school: '清华大学',
        professional: '电子信息技术专业',
        introduce: '大学英语四级成绩590，大学六级成绩630，带过初三毕业班英语，学生单科进步30',
        img: '../../imgs/teacher2.jpg'
      },
      {
        name: '小林老师',
        gender: '男',
        school: '武昌工学院',
        professional: '土木工程专业',
        introduce: '英语非常好，与印度老外无障碍沟通',
        img: '../../imgs/teacher3.jpg'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTeacherList(options.type)
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

  initTeacherList (type) {
    request({ url: `/subject_teacher/${type}/teachers` }).then((res) => {
      if (res.data) {
        const teacherList = res.data.map(item => {
          const avatar = item.avatar && (item.avatar.endsWith('jpg') || item.avatar.endsWith('png')) ? item.avatar : null
          return { ...item, avatar }
        })
        this.setData({teacherList})
      }
    })
  },

  goAppointStatus (e) {
    const teacher = e.currentTarget.dataset.teacher
    app.globalData.currentTeacher = e.currentTarget.dataset.teacher
    wx.navigateTo({ url: `/pages/appointmentStatus/appointmentStatus?teacherId=${teacher.id}` })
  }
})