const axios = require("axios")
const qs = require("qs")

axios.interceptors.request.use(
  (config) => {
    config.transformRequest = (data) => qs.stringify(data)
    return config
  },
  (err) => {
    return err
  }
)

axios.interceptors.response.use(
  (response) => {
    const { data, config: { url } } = response
    const { errcode, errmsg } = data
    if (url.indexOf("https://api.weixin.qq.com") !== -1 && errcode) {
      throw new Error(errmsg)
    }
    return data
  },
  (error) => {
    throw new Error(error)
  }
)

module.exports = axios
