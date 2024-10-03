import axios from "../../utils/axios"

export const funcGetUserLogin = (data) => {
  return axios({
    url: "/user/login",
    data
  })
}

export const funcPutSetInfo = (data) => {
  return axios({
    url: "/user/setInfo",
    data,
    method: "PUT"
  })
}
