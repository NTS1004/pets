console.log("getApp()", getApp().data.isPlay)
Page({
  data: {
    openid: "",
    info: {},
    hobby_list: [],
    isPlay: getApp().data.isPlay
  },
  onShow() {
    const openid = wx.getStorageSync("openid")
    const info = wx.getStorageSync("info")
    if (info.hobby) {
      this.setData({
        hobby_list: info.hobby.split(",")
      })
    }
    if (openid) {
      this.setData(({
        openid,
        info
      }))
    }
  },
  tapInfo() {
    if (this.data.openid) {
      wx.navigateTo({
        url: '/pages/info/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },
  logout() {
    wx.removeStorageSync("openid")
    wx.removeStorageSync("info")
    this.setData({
      openid: "",
      info: {}
    })
    wx.showToast({
      title: '退出成功',
    })
  },
  onMusic() {
    getApp().onMusic()
    this.setData({
      isPlay: getApp().data.isPlay
    })
  }
})