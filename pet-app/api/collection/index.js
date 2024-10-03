import axios from "../../utils/axios"

export const funcGetCollectionList = (data) => {
  return axios({
    url: "/collection/list",
    data
  })
}

export const funcGetIsExistCollection = (data) => {
  return axios({
    url: "/collection/isExist",
    data
  })
}

export const funcPostAddCollection = (data) => {
  return axios({
    url: "/collection/add",
    data,
    method: "POST"
  })
}

export const funcPutCancelCollection = (data) => {
  return axios({
    url: "/collection/cancel",
    data,
    method: "PUT"
  })
}