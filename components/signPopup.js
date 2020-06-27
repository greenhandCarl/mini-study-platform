// components/signPopup.js
import { wxLogin } from '../api/wxapi.js'

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
        console.log('res.code', res.code)
      } catch (err) {
        console.log('wxLogin err.errMsg', err.errMsg)
      }
    }
  }
})
