// const domain = 'http://120.26.77.52:8080'
const domain = 'https://www.shankkeya.net/api'
const app = getApp()

const openId = (app.globalData.userInfo && app.globalData.userInfo.openId) || ''

export const request = ({ url, data, method }) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${domain}${url}`,
      method,
      data,
      header: { 'content-type': 'application/json', 'Authorization': openId },
      success (res) { resolve(res.data) },
      fail (err) { reject(err) }
    })
  })
}