import {
  funcGetCateList
} from "../../api/config/index.js"

import {
  funcGetPetList
} from "../../api/pets/index.js"

Page({
  data: {
    cate_list: [],
    pet_list: [],
    active_cate: 0,
    barLeft: 0,
    default_left: 0,
    pet_list_end: false,
    pet_list_page: 0
  },
  onLoad({
    cate_id
  }) {
    this.data.cate_id = cate_id
    this.getCateList()
    this.getPetList(cate_id)
  },
  onPullDownRefresh() {
    this.setData({
      pet_list: [],
      pet_list_end: false,
      pet_list_page: 0
    })
    this.getPetList(this.data.active_cate)
    wx.stopPullDownRefresh()
  },
  async getCateList() {
    try {
      const data = await funcGetCateList()
      this.setData({
        cate_list: data,
        active_cate: this.data.cate_id
      })
      var query = wx.createSelectorQuery();
      query.select(`.item-${this.data.cate_id}`).boundingClientRect();
      query.exec((res) => {
        const {
          width,
          left
        } = res[0];
        this.data.default_left = (width - 88 / 750 * wx.getSystemInfoSync().windowWidth) / 2
        this.setData({
          barLeft: this.data.default_left + left
        })
      })
      this.setData({
        cate_list: data
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getPetList(cate_id) {
    wx.showLoading({
      title: '加載中...',
    })
    try {
      const data = await funcGetPetList({
        cate_id,
        page: this.data.pet_list_page
      })
      this.setData({
        pet_list: [...this.data.pet_list, ...data]
      })
      if (data.length < 6) {
        this.data.pet_list_end = true
      } else {
        this.data.pet_list_page += 1
      }
    } catch (err) {
      console.log(err)
    }
    wx.hideLoading()
  },
  selectCate(e) {
    const {
      currentTarget: {
        offsetLeft,
        dataset: {
          cate_id
        }
      }
    } = e
    this.setData({
      pet_list: [],
      pet_list_end: false,
      pet_list_page: 0
    })
    this.getPetList(cate_id)
    this.setData({
      barLeft: offsetLeft + this.data.default_left,
      active_cate: cate_id
    })
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
    if (!this.data.pet_list_end) {
      this.getPetList(this.data.active_cate)
    }
  }
})