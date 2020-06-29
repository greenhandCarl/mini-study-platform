// components/signPopup.js
import { wxLogin } from '../api/wxapi.js'
import { login } from '../api/request.js'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowSign: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel () {
      this.triggerEvent('setShowSign', { isShowSign: false }, {})
    },
    async onOk () {
      try {
        const res = await wxLogin()
        const result = await login({ code: res.code })
        // 设置到global中 转驼峰
        app.globalData.userInfo
          ? app.globalData.userInfo = { ...app.globalData.userInfo, openId: result.openid }
          : app.globalData.userInfo = { openId: result.openid }
        // 设置到缓存中 不转驼峰
        wx.setStorageSync('openid', result.openid)
        this.triggerEvent('setShowSign', { isShowSign: false }, {})
      } catch (err) {
        console.log('wxLogin err.errMsg', err.errMsg)
      }
    }
  }
})
