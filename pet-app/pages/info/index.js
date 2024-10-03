import {
  funcGetCateList
} from "../../api/config/index.js"

import {
  funcPutSetInfo
} from "../../api/user/index.js"

Page({
  data: {
    info: {},
    cate_list: [],
    hobby_list: [1]
  },
  onLoad() {
    const info = wx.getStorageSync("info")
    this.setData({
      info
    })
    this.getCateList()
  },
  async getCateList() {
    try {
      const data = await funcGetCateList()
      const {
        info
      } = this.data
      for (let i = 0; i < data.length; i++) {
        const {
          image
        } = data[i]
        data[i].checked = info.hobby ? info.hobby.includes(image) : false
      }
      this.setData({
        cate_list: data
      })
    } catch (err) {
      console.log(err)
    }
  },
  async putSetInfo(info) {
    wx.showLoading({
      title: '保存中...',
    })
    try {
      await funcPutSetInfo(info)
      wx.showToast({
        title: '保存成功',
      })
      wx.setStorageSync('info', this.data.info)
    } catch (err) {
      console.log(err)
    }
  },
  inputName(e) {
    const {
      value
    } = e.detail
    this.data.info.name = value
    this.setData({
      info: this.data.info
    })
  },
  selectSex(e) {
    const {
      detail: {
        value
      }
    } = e
    this.data.info.sex = value
  },
  selectDate(e) {
    const {
      detail: {
        value
      }
    } = e
    this.data.info.birthday = value
    this.setData({
      info: this.data.info
    })
  },
  selectHobby(e) {
    const {
      detail: {
        value
      }
    } = e
    this.data.info.hobby = value.join(",")
  },
  saveInfo() {
    if (!this.data.info.name) {
      wx.showToast({
        title: '昵称不能为空',
        icon: "none"
      })
      return
    }
    const {
      info: {
        id,
        create_time,
        ...set_info
      }
    } = this.data
    this.putSetInfo(set_info)
  }
})