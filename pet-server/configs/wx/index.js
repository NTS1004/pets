const axios = require("@/utils/axios")

class wx {
  constructor({ appid, secret }) {
    this.host = "https://api.weixin.qq.com"
    this.params = { appid, secret }
  }
  // 登录
  getAuthLogin(js_code) {
    let params = Object.assign({}, this.params, { js_code, grant_type: "authorization_code" })
    return axios.get(`${this.host}/sns/jscode2session`, { params })
  }
}

module.exports = wx
