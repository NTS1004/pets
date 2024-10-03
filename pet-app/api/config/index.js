import axios from "../../utils/axios"

export const funcGetSwiperList = () => {
  return axios({
    url: "/config/swiper"
  })
}

export const funcGetCateList = () => {
  return axios({
    url: "/config/cate"
  })
}

export const funcGetRecommendList = (data) => {
  return axios({
    url: "/config/recommend",
    data
  })
}

export const funcGetPetList = (data) => {
  return axios({
    url: "/config/list",
    data
  })
}