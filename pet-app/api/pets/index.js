import axios from "../../utils/axios"

export const funcGetPetList = (data) => {
  return axios({
    url: "/pets/list",
    data
  })
}

export const funcGetPetDetails = (pet_id, data) => {
  return axios({
    url: `/pets/details/${pet_id}`,
    data
  })
}