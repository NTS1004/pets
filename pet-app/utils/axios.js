const axios = ({
  url,
  data = {},
  method = "GET"
}) => {
  return new Promise((resolve, reject) => {
    const openid = wx.getStorageSync("openid")
    let header = {}
    if (openid) {
      header = {
        openid
      }
    }
    wx.request({
      url: `http://localhost:14${url}`,
      data,
      method,
      header,
      success: ({
        data: {
          data
        }
      }) => {
        resolve(data)
      },
      error: (err) => {
        reject(err)
      }
    })
  })
}

export default axios