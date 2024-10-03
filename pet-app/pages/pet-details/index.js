import {
  funcGetPetDetails
} from "../../api/pets/index.js"

import {
  funcGetIsExistCollection,
  funcPostAddCollection,
  funcPutCancelCollection
} from "../../api/collection/index.js"

Page({

  data: {
    details: {},
    current: 0,
    tabList: ["图片", "视频"],
    nav_style: {},
    image_current: 0,
    pet_id: null,
    openid: "",
    isCollection: 0
  },

  onLoad({
    pet_id
  }) {
    const {
      top,
      height
    } = wx.getMenuButtonBoundingClientRect()
    this.setData({
      nav_style: [`top: ${top}px; height: ${height}px`]
    })
    this.data.pet_id = pet_id
    this.data.openid = wx.getStorageSync("openid")
    this.getPetDetails()
  },

  onShow() {
    this.data.openid = wx.getStorageSync("openid")
    if (this.data.openid) {
      this.getIsExistCollection()
    }
  },

  async getPetDetails() {
    try {
      const data = await funcGetPetDetails(this.data.pet_id)
      data.images = data.images.split(",")
      this.setData({
        details: data
      })
    } catch (err) {
      console.log(err)
    }
  },

  async getIsExistCollection() {
    const {
      pet_id
    } = this.data
    try {
      const data = Number(await funcGetIsExistCollection({
        pet_id
      }))
      this.setData({
        isCollection: data
      })
    } catch (err) {
      console.log(err)
    }
  },

  async postAddCollection() {
    const {
      pet_id
    } = this.data
    wx.showLoading({
      title: '收藏中...',
    })
    try {
      await funcPostAddCollection({
        pet_id
      })
      wx.showToast({
        title: '收藏成功',
      })
      this.getIsExistCollection()
    } catch (err) {
      console.log(err)
    }
  },

  async postAddCollection() {
    const {
      pet_id
    } = this.data
    wx.showLoading({
      title: '收藏中...',
    })
    try {
      await funcPostAddCollection({
        pet_id
      })
      wx.showToast({
        title: '收藏成功',
      })
      this.getIsExistCollection()
    } catch (err) {
      console.log(err)
    }
  },

  async putCancelCollection() {
    const {
      pet_id
    } = this.data
    wx.showLoading({
      title: "取消中...",
    })
    try {
      await funcPutCancelCollection({
        pet_id
      })
      wx.showToast({
        title: '取消成功',
      })
      this.getIsExistCollection()
    } catch (err) {
      console.log(err)
    }
  },

  selectTab(e) {
    const {
      currentTarget: {
        dataset: {
          index
        }
      }
    } = e
    this.setData({
      current: index
    })
  },

  toBack() {
    wx.navigateBack()
  },

  changeCollection() {
    if (!this.data.openid) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    if (this.data.isCollection) {
      this.putCancelCollection()
    } else {
      this.postAddCollection()
    }
  },

  previewImage(e) {
    const {
      currentTarget: {
        dataset: {
          image
        }
      }
    } = e
    wx.previewImage({
      current: image,
      showmenu: true,
      urls: this.data.details.images,
    })
  }
})