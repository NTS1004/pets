import {
  funcGetCollectionList
} from "../../api/collection/index"

Page({
  data: {
    list: [],
    list_end: false,
    list_page: 0
  },
  onLoad() {
    this.data.openid = wx.getStorageSync("openid")
    if (!this.data.openid) {
      wx.navigateTo({
        url: "/pages/login/index",
      })
    }
  },
  onShow() {
    this.data.openid = wx.getStorageSync("openid")
    if (this.data.openid) {
      this.setData({
        list: [],
        list_end: false,
        list_page: 0
      })
      this.getCollectionList()
    } else {
      this.setData({
        list: [],
        list_end: false,
        list_page: 0
      })
    }
  },
  onHide() {
  },
  async getCollectionList() {
    try {
      const data = await funcGetCollectionList({
        page: this.data.list_page
      })
      this.setData({
        list: [...this.data.list, ...data]
      })
      if (data.length < 6) {
        this.data.list_end = true
      } else {
        this.data.list_page += 1
      }
    } catch (err) {
      console.log(err)
    }
  },
  toDetails(e) {
    const {
      currentTarget: {
        dataset: {
          id
        }
      }
    } = e

    wx.navigateTo({
      url: `/pages/pet-details/index?pet_id=${id}`,
    })
  },
  scrolltolower() {
    if (!this.data.list_end) {
      this.getCollectionList()
    }
  }
})