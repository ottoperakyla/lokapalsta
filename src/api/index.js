import axios from 'axios'
const ROOT_URL = 'http://craschan.clients.crasman.fi/stage-ajax'

export const fetchPosts = (read) => {
  return axios.get(`${ROOT_URL}/fetchPosts`)
}

export const fetchPost = (id) => {
  return axios.get(`${ROOT_URL}/fetchPost?uuid=` + id)
}

export const createPost = (params) => {
  return axios.post(`${ROOT_URL}/createPost`, { params: params })
}


