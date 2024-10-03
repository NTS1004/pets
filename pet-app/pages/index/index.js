import {
  funcGetSwiperList,
  funcGetCateList,
  funcGetRecommendList
} from "../../api/config/index.js"

Page({
  data: {
    swiper_list: [],
    cate_list: [],
    recommend_list: [],
    recommend_list_end: false,
    recommend_list_page: 0
  },
  onLoad() {
    this.getSwiperList()
    this.getCateList()
    this.getRecommendList()
  },
  onPullDownRefresh() {
    this.getSwiperList()
    this.getCateList()
    this.setData({
      recommend_list: [],
      recommend_list_end: false,
      recommend_list_page: 0
    })
    this.getRecommendList()
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    if (!this.data.recommend_list_end) {
      this.getRecommendList()
    }
  },
  async getSwiperList() {
    try {
      const data = await funcGetSwiperList()
      this.setData({
        swiper_list: data
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getCateList() {
    try {
      const data = await funcGetCateList()
      this.setData({
        cate_list: data
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getRecommendList() {
    wx.showLoading({
      title: '加载中...',
    })
    try {
      const data = await funcGetRecommendList({
        page: this.data.recommend_list_page
      })
      this.setData({
        recommend_list: [...this.data.recommend_list, ...data]
      })
      if (data.length < 5) {
        this.data.recommend_list_end = true
      } else {
        this.data.recommend_list_page += 1
      }
    } catch (err) {
      console.log(err)
    }
    wx.hideLoading()
  },
  selectCate(e) {
    const {
      currentTarget: {
        dataset: {
          cate_id
        }
      }
    } = e
    wx.navigateTo({
      url: `/pages/pets-list/index?cate_id=${cate_id}`,
    })
  },
  toPetDetails(e) {
    const {
      currentTarget: {
        dataset: {
          pet_id
        }
      }
    } = e
    wx.navigateTo({
      url: `/pages/pet-details/index?pet_id=${pet_id}`,
    })
  }
})