// const domain = 'http://120.26.77.52:8080'
const domain = 'https://www.shankkeya.net/api'

export const request = ({ url, data, method }) => {
  return new Promise((resolve, reject) =>{
    wx.request({
      url: `${domain}${url}`,
      method,
      data,
      header: { 'content-type': 'application/json' },
      success (res) { resolve(res.data) },
      fail (err) { reject(err) }
    })
  })
}