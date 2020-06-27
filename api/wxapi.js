export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}