import { funcGetUserLogin } from "../../api/user/index.js"

Page({
  async getUserLogin(code) {
    wx.showLoading({
      title: "登录中..."
    })
    try {
      const { openid, info } = await funcGetUserLogin({
        code
      })
      wx.setStorageSync("openid", openid) // 保存ooenid到本地缓存
      wx.setStorageSync("info", info) // 保存用户信息到本地缓存
      wx.showToast({
        title: "登录成功",
        success: () => {
          setTimeout(() => {
            wx.navigateBack() // 提示用户登录成功后返回上一页
          }, 200)
        }
      })
    } catch (err) {
      console.log(err)
    }
    wx.hideLoading()
  },
  login() {
    // 按钮点击事件
    wx.login({
      success: ({ code }) => {
        this.getUserLogin(code) //请求服务端login接口事件
      }
    })
  }
})
